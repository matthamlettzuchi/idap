// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { requireCmsUser, requireCmsUserApi } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const auth = await requireCmsUserApi("admin");
  if (!auth.ok)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: auth.status },
    );
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, user_id, role, created_at");

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // enrich with email — service-role only, never sent raw to the browser
  // beyond what's needed here
  const adminClient = createAdminClient();
  const enriched = await Promise.all(
    data.map(async (row) => {
      const { data: authUser } = await adminClient.auth.admin.getUserById(
        row.user_id,
      );
      return { ...row, email: authUser?.user?.email ?? "unknown" };
    }),
  );

  return NextResponse.json({ users: enriched });
}

export async function POST(request: Request) {
  const auth = await requireCmsUserApi("admin");
  if (!auth.ok)
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: auth.status },
    ); // redirects on failure inside Server Components;
  // for a Route Handler we want a 403 instead — see note below

  const { email, role } = await request.json();
  if (!email || !["admin", "editor"].includes(role)) {
    return NextResponse.json({ error: "Invalid input." }, { status: 400 });
  }

  const adminClient = createAdminClient();

  const { data: invited, error: inviteError } =
    await adminClient.auth.admin.inviteUserByEmail(email);
  if (inviteError || !invited.user) {
    return NextResponse.json(
      { error: inviteError?.message ?? "Invite failed." },
      { status: 500 },
    );
  }

  const supabase = await createClient();
  const { error: insertError } = await supabase
    .from("admin_users")
    .insert({ user_id: invited.user.id, role });

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
