import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryColumn({ name: 'email' })
  email: string

  @Column({ name: 'password' })
  password: string

  @Column({ name: 'nickname' })
  nickname: string

  @Column({ name: 'tel' })
  tel: string

  @Column({ name: 'address' })
  address: string

  @Column({ name: 'address_detail' })
  addressDetail?: string

  @Column({ name: 'profile_img' })
  profileImg?: string

  @Column({ name: 'is_agreed' })
  isAgreed: boolean
}
