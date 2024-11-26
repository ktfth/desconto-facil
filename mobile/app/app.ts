import { Application } from '@nativescript/core';

// Remove direct iOS-specific code from the main app.ts
Application.run({ moduleName: 'app-root' });