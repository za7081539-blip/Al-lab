import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
} from "firebase/auth";

import { auth } from "@/lib/firebase";

// Get the user data we need from Firebase
export const toSerializableUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName || null,
});

// Initial state
const initialState = {
  user: null,
  loading: true,
  error: null,
};

// Signup with email and password
export const signup = createAsyncThunk(
  "auth/signup",
  async ({ email, password, name }, { rejectWithValue }) => {
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );

      // Add the user's name to their profile
      try {
        await updateProfile(credential.user, {
          displayName: (name || "").trim(),
        });
      } catch (error) {
        console.error("Profile update failed:", error);
      }

      return toSerializableUser(credential.user);
    } catch (error) {
      return rejectWithValue({
        code: error.code || "auth/unknown",
      });
    }
  },
);

// Login with email and password
export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const credential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );

      return toSerializableUser(credential.user);
    } catch (error) {
      return rejectWithValue({
        code: error.code || "auth/unknown",
      });
    }
  },
);

// Login with Google
export const loginWithGoogle = createAsyncThunk(
  "auth/loginWithGoogle",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      return toSerializableUser(credential.user);
    } catch (error) {
      return rejectWithValue({
        code: error.code || "auth/unknown",
      });
    }
  },
);

// Login with Facebook
export const loginWithFacebook = createAsyncThunk(
  "auth/loginWithFacebook",
  async (_, { rejectWithValue }) => {
    try {
      const provider = new FacebookAuthProvider();
      const credential = await signInWithPopup(auth, provider);

      return toSerializableUser(credential.user);
    } catch (error) {
      return rejectWithValue({
        code: error.code || "auth/unknown",
      });
    }
  },
);
// Logout
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
    } catch (error) {
      return rejectWithValue({
        code: error.code || "auth/unknown",
      });
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateChanged: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Signup
      .addCase(signup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Google login
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Facebook login
      .addCase(loginWithFacebook.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithFacebook.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithFacebook.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { authStateChanged } = authSlice.actions;
export default authSlice.reducer;
