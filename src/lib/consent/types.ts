export type ConsentCategories = {
  necessary: true; // siempre true, no negociable
  analytics: boolean;
  marketing: boolean;
};

export type ConsentAction = "accepted" | "rejected" | "updated" | "withdrawn";

export type ConsentSource =
  | "banner_initial"
  | "preferences_modal"
  | "form_submit"
  | "withdrawal_link"
  | "admin_override";

export type ConsentState = {
  categories: ConsentCategories;
  version: string;
  timestamp: number; // ms epoch
  sessionId: string;
};
