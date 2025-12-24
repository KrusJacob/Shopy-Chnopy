export interface FirestoreUserDoc {
  fields?: {
    role: { stringValue: "admin" | "user" };
    productsCart: {
      arrayValue?: {
        values?: {
          stringValue: string;
        }[];
      };
    };
  };
}
