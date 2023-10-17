export default class LocalStorage {
  static getItem<T>(key: string) {
    try {
      const valueString = localStorage.getItem(key)
      if (!valueString) throw Error()

      return JSON.parse(valueString) as T
    } catch (error) {
      return null
    }
  }

  static setItem<T>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data))
  }

  static removeItem(key: string) {
    localStorage.removeItem(key)
  }
}
