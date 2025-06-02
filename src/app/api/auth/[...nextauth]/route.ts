// app/api/auth/[...nextauth]/route.ts

import { handlers } from "@/auth"; // src/auth.ts から handlers をインポート
export const { GET, POST } = handlers;