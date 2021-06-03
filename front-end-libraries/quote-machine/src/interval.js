import { createSlice } from '@reduxjs/toolkit'

const AUTO_CHANGE_TIME = 15000;

export default class ChangeQuoteInterval {
    constructor(func, time=AUTO_CHANGE_TIME) {
        this.func = func;
        this.time = time;
        this.intervalId = setInterval(this.func, this.time);
    }

    reset() {
        clearInterval(this.intervalId);
        this.intervalId = setInterval(this.func, this.time);
    }

}

export const fakeInterval = {
    reset() {
        console.log("There's no interval set yet")
    }
}
