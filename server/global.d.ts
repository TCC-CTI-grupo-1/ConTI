import express from 'express';

interface User{
    id: number;
}

declare module 'express-session' {
  interface SessionData {
    isLoggedIn: boolean;
    user?: User;
  }
}