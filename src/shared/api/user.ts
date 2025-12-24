import { FirestoreUserDoc } from "@/types/user.types";
import { jsonApiInstance } from "./api-instance";

const API_KEY = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

export const UserApi = {
  createUser: async (email: string, password: string) => {
    return jsonApiInstance<{ localId: string; idToken: string }>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: "POST",
        json: {
          email,
          password,
          returnSecureToken: true,
        },
      }
    );
  },
  createUserDoc: async (localId: string, idToken: string, email: string) => {
    return jsonApiInstance(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users?documentId=${localId}`,
      {
        method: "POST",
        headers: { Authorization: `Bearer ${idToken}` },
        json: {
          fields: {
            email: { stringValue: email },
            role: { stringValue: "user" },
            productsCart: { arrayValue: { values: [] } },
          },
        },
      }
    );
  },

  getUserData: async (localId: string, idToken: string) => {
    try {
      const data = await jsonApiInstance<FirestoreUserDoc>(
        `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${localId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${idToken}` },
        }
      );
      const role = data.fields?.role?.stringValue;
      const productsCart =
        data.fields?.productsCart?.arrayValue?.values?.map(
          (v) => v.stringValue
        ) ?? [];
      return { role, productsCart };
    } catch (error) {
      // localStorage.removeItem("auth-store");
      throw new Error("User is not authorized");
    }
  },
  loginUser: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    return jsonApiInstance<{ localId: string; idToken: string }>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: "POST",
        json: {
          email,
          password,
          returnSecureToken: true,
        },
      }
    );
  },
  updateProductCartUser: async ({
    localId,
    idToken,
    productsId,
  }: {
    localId: string;
    idToken: string;
    productsId: string[];
  }) => {
    return jsonApiInstance(
      `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${localId}?updateMask.fieldPaths=productsCart`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${idToken}` },
        json: {
          fields: {
            productsCart: {
              arrayValue: {
                values: productsId.map((id) => ({
                  stringValue: id,
                })),
              },
            },
          },
        },
      }
    );
  },
};
