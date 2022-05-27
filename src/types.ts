/**
 * Sample Requirements:
 * {
 *  name: "CSC436H1"
 * },
 * {
 *  name: "CSC336H1",
 *  elaboration: "CSC336H1 (75%)"
 * }
 */
export type Requirement = {
    name: string
    elaboration?: string
}
