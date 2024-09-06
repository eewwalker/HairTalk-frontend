// jest.setup.ts
import '@testing-library/jest-dom';

// Mock requestSubmit for JSDOM
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function () {
    if (this.submit) {
      this.submit(); // Fallback to old submit method if available
    }
  };
}
