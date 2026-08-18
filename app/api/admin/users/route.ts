// app/api/admin/users/route.ts
import { NextResponse } from "next/server";
import { requireCmsUserApi } from "@/lib/admin/auth";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";
import {
  isValidUsername,
  normalizeUsername,
  usernameToAuthEmail,
} from "@/lib/admin/username";

export async function GET() {
  const auth = await requireCmsUserApi("admin");
  if (!auth.ok) return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("admin_users")
    .select("id, user_id, username, role, created_at")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ users: data });
}

export async function POST(request: Request) {
  const auth = await requireCmsUserApi("admin");
  if (!auth.ok) return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });

  const { username, password, role } = await request.json();

  if (typeof username !== "string" || !isValidUsername(normalizeUsername(username))) {
    return NextResponse.json(
      {
        error:
          "Username must be 3-32 characters: lowercase letters, numbers, dots, dashes, or underscores.",
      },
      { status: 400 }
    );
  }
  if (typeof password !== "string" || password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }
  if (!["admin", "editor"].includes(role)) {
    return NextResponse.json({ error: "Invalid role." }, { status: 400 });
  }

  const cleanUsername = normalizeUsername(username);
  const adminClient = createAdminClient();

  const { data: created, error: createError } = await adminClient.auth.admin.createUser({
    email: usernameToAuthEmail(cleanUsername),
    password,
    email_confirm: true,
    user_metadata: { username: cleanUsername },
  });

  if (createError || !created.user) {
    const message = createError?.message.includes("already been registered")
      ? "That username is already taken."
      : (createError?.message ?? "Failed to create user.");
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // service role — bypasses RLS, since access here is already gated by
  // requireCmsUserApi("admin") above
  const { error: insertError } = await adminClient
    .from("admin_users")
    .insert({ user_id: created.user.id, username: cleanUsername, role });

  if (insertError) {
    await adminClient.auth.admin.deleteUser(created.user.id);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: Request) {
  const auth = await requireCmsUserApi("admin");
  if (!auth.ok) return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });

  const { user_id } = await request.json();
  if (typeof user_id !== "string" || !user_id) {
    return NextResponse.json({ error: "Missing user_id." }, { status: 400 });
  }

  const adminClient = createAdminClient();

  const { error: deleteRowError } = await adminClient
    .from("admin_users")
    .delete()
    .eq("user_id", user_id);
  if (deleteRowError) return NextResponse.json({ error: deleteRowError.message }, { status: 500 });

  await adminClient.auth.admin.deleteUser(user_id);

  return NextResponse.json({ ok: true });
}