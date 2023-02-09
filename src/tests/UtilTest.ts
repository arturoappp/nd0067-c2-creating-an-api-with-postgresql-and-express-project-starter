export class UtilTest {
    static getRandomString() {
        return (Math.random() + 1).toString(36).substring(7);
    }

    static getRandomNumber() {
        return Math.floor(Math.random() * 100);
    }
}