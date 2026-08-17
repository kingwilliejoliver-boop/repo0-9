export type AccountSnap = {
  freeUsed: number;
  paidCredits: number;
};

export type Session = {
  configured: boolean;
  ready: boolean;
  signedIn: boolean;
  getToken: () => Promise<string | null>;
  openSignIn: () => void;
  account: AccountSnap | null;
  applyAccount: (next: AccountSnap) => void;
  refreshAccount: () => Promise<AccountSnap | null>;
};

export const clerkLocalization = {
  signIn: {
    start: {
      title: "Sign in to ShotFarm",
      titleCombined: "Sign in to ShotFarm",
    },
  },
  signUp: {
    start: {
      title: "Create your ShotFarm account",
      titleCombined: "Create your ShotFarm account",
      subtitle: "Welcome. Fill in the details to get started.",
    },
  },
};

export const clerkAppearance = {
  variables: {
    colorPrimary: "#111111",
    colorText: "#111111",
    borderRadius: "0.75rem",
  },
  elements: {
    rootBox: "w-full max-w-full",
    cardBox: "w-full max-w-full shadow-none",
    card: "w-full max-w-full shadow-none",
    modalBackdrop: "flex items-center justify-center p-5",
    modalContent: "mx-auto my-0",
  },
};

export const localSession: Session = {
  configured: false,
  ready: true,
  signedIn: true,
  getToken: async () => null,
  openSignIn: () => {},
  account: null,
  applyAccount: () => {},
  refreshAccount: async () => null,
};

export async function fetchAccount(getToken: () => Promise<string | null>): Promise<AccountSnap | null> {
  const token = await getToken();
  if (!token) return null;
  const res = await fetch("/api/me", { headers: { Authorization: `Bearer ${token}` } });
  const data = (await res.json().catch(() => ({}))) as { freeUsed?: number; paidCredits?: number };
  if (!res.ok || typeof data.freeUsed !== "number" || typeof data.paidCredits !== "number") return null;
  return { freeUsed: data.freeUsed, paidCredits: data.paidCredits };
}
