/**
 * @file state.js
 * @module WebUSB/State
 * @description Quản lý máy trạng thái FSM duy nhất và phân phối sự kiện giao diện.
 * @stateDepends AppState
 * @security Đảm bảo không xảy ra đụng độ Race Condition hoặc nhảy cóc trạng thái.
 */

import { AppState } from "./constants.js";

class StateManager {
  constructor() {
    /** @type {string} Trạng thái hiện tại của ứng dụng */
    this._currentState = AppState.IDLE;

    /** @type {object} Dữ liệu phiên làm việc hiện tại */
    this._sessionData = {
      usbHandle: null,
      driveName: "",
      totalFiles: 0,
      threats: [],
      safetyScore: 100,
      usbSerial: "",
      paymentId: "",
      errorCode: null,
      errorMessage: "",
    };

    /** @type {Array<function(string, object): void>} Danh sách callback theo dõi trạng thái */
    this._subscribers = [];
  }

  /**
   * Lấy trạng thái hiện tại.
   * @returns {string} Trạng thái FSM hiện hành.
   */
  getState() {
    return this._currentState;
  }

  /**
   * Lấy bản sao dữ liệu phiên hiện tại.
   * @returns {object} Dữ liệu phiên.
   */
  getSessionData() {
    return { ...this._sessionData };
  }

  /**
   * Lấy bản sao dữ liệu phiên (bí danh cho getSessionData để chống lỗi gọi tắt).
   * @returns {object} Dữ liệu phiên.
   */
  getSession() {
    return this.getSessionData();
  }

  /**
   * Đăng ký hàm lắng nghe khi trạng thái thay đổi.
   * @param {function(string, object): void} callback - Hàm thực thi khi state đổi.
   * @returns {void}
   */
  subscribe(callback) {
    if (typeof callback === "function") {
      this._subscribers.push(callback);
    }
  }

  /**
   * Chuyển đổi trạng thái FSM và phát sự kiện tới các subscriber.
   * @param {string} newState - Trạng thái mới từ enum AppState.
   * @param {object} [partialData={}] - Dữ liệu cập nhật kèm theo.
   * @returns {boolean} True nếu chuyển trạng thái hợp lệ.
   */
  transition(newState, partialData = {}) {
    if (!Object.values(AppState).includes(newState)) {
      console.error(`[FSM Guard] Trạng thái không hợp lệ: ${newState}`);
      return false;
    }

    // Cập nhật dữ liệu phiên
    this._sessionData = {
      ...this._sessionData,
      ...partialData,
    };

    const previousState = this._currentState;
    this._currentState = newState;

    console.log(`[FSM] Chuyển trạng thái: ${previousState} ➔ ${newState}`);

    // Bắn sự kiện tới toàn bộ subscriber
    for (const notify of this._subscribers) {
      try {
        notify(this._currentState, this.getSessionData());
      } catch (err) {
        console.error("[FSM Subscriber Error]", err);
      }
    }

    return true;
  }

  /**
   * Đặt lại trạng thái về ban đầu (IDLE).
   * @returns {void}
   */
  reset() {
    this.transition(AppState.IDLE, {
      usbHandle: null,
      driveName: "",
      totalFiles: 0,
      threats: [],
      safetyScore: 100,
      usbSerial: "",
      paymentId: "",
      errorCode: null,
      errorMessage: "",
    });
  }
}

export const appState = new StateManager();

