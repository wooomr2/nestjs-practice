import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'search_log' })
export class SearchLogEntity {

    @PrimaryGeneratedColumn({ name: 'seq' })
    seq: number

    @Column({ name: 'search_word' })
    searchWord: string

    @Column({ name: 'related_word' })
    relatedWord: string | null

    @Column({ name: 'is_related' })
    isRelated: boolean
}