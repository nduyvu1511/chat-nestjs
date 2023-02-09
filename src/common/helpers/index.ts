import * as bcrypt from 'bcrypt'
import { ObjectId } from 'mongodb'

export async function hashPassword(rawPassword: string) {
  return bcrypt.hash(rawPassword, 10)
}

export function compareSyncPassword(data: string, encrypted: string): boolean {
  return bcrypt.compareSync(data, encrypted)
}

export const typeOf = (value: any) => Object.prototype.toString.call(value).slice(8, -1)

export function compareTwoObjectId(id1: string | ObjectId, id2: string | ObjectId) {
  return id1?.toString?.() === id2?.toString?.()
}
