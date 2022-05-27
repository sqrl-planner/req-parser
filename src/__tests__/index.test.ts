import Parser from ".."
import {
    naiveSplitRequirementGroup,
    naiveTokenizeList,
} from "../parser/tokenize"

describe("naive parser", () => {
    it("should tokenize and split requirement group", () => {
        const parsedResults = Parser(
            `CSC207H1/ APS105H1/ APS106H1/ ESC180H1/ CSC180H1; MAT235Y1/​ MAT237Y1/​ MAT257Y1/​ (minimum of 77% in MAT135H1 and MAT136H1)/ (minimum of 73% in MAT137Y1)/ (minimum of 67% in MAT157Y1)/ MAT291H1/ MAT294H1/ (minimum of 77% in MAT186H1, MAT187H1)/ (minimum of 73% in MAT194H1, MAT195H1)/ (minimum of 73% in ESC194H1, ESC195H1); MAT223H1/ MAT240H1/ MAT185H1/ MAT188H1; STA237H1/ STA247H1/ STA255H1/ STA257H1/ STA286H1/ CHE223H1/ CME263H1/ MIE231H1/ MIE236H1/ MSE238H1/ ECE286H1`
        )

        expect(parsedResults).toStrictEqual([
            [
                { name: "CSC207H1", elaboration: "CSC207H1" },
                { name: "APS105H1", elaboration: "APS105H1" },
                { name: "APS106H1", elaboration: "APS106H1" },
                { name: "ESC180H1", elaboration: "ESC180H1" },
                { name: "CSC180H1", elaboration: "CSC180H1" },
            ],
            [
                { name: "MAT235Y1", elaboration: "MAT235Y1" },
                { name: "MAT237Y1", elaboration: "MAT237Y1" },
                { name: "MAT257Y1", elaboration: "MAT257Y1" },
                {
                    name: "MAT135H1",
                    elaboration: "(minimum of 77% in MAT135H1 and MAT136H1)",
                },
                {
                    name: "MAT137Y1",
                    elaboration: "(minimum of 73% in MAT137Y1)",
                },
                {
                    name: "MAT157Y1",
                    elaboration: "(minimum of 67% in MAT157Y1)",
                },
                { name: "MAT291H1", elaboration: "MAT291H1" },
                { name: "MAT294H1", elaboration: "MAT294H1" },
                {
                    name: "MAT186H1",
                    elaboration: "(minimum of 77% in MAT186H1, MAT187H1)",
                },
                {
                    name: "MAT194H1",
                    elaboration: "(minimum of 73% in MAT194H1, MAT195H1)",
                },
                {
                    name: "ESC194H1",
                    elaboration: "(minimum of 73% in ESC194H1, ESC195H1)",
                },
            ],
            [
                { name: "MAT223H1", elaboration: "MAT223H1" },
                { name: "MAT240H1", elaboration: "MAT240H1" },
                { name: "MAT185H1", elaboration: "MAT185H1" },
                { name: "MAT188H1", elaboration: "MAT188H1" },
            ],
            [
                { name: "STA237H1", elaboration: "STA237H1" },
                { name: "STA247H1", elaboration: "STA247H1" },
                { name: "STA255H1", elaboration: "STA255H1" },
                { name: "STA257H1", elaboration: "STA257H1" },
                { name: "STA286H1", elaboration: "STA286H1" },
                { name: "CHE223H1", elaboration: "CHE223H1" },
                { name: "CME263H1", elaboration: "CME263H1" },
                { name: "MIE231H1", elaboration: "MIE231H1" },
                { name: "MIE236H1", elaboration: "MIE236H1" },
                { name: "MSE238H1", elaboration: "MSE238H1" },
                { name: "ECE286H1", elaboration: "ECE286H1" },
            ],
        ])
    })
})

describe("naive split group of requirements", () => {
    it("should split a group of requirements", () => {
        expect(
            naiveSplitRequirementGroup(
                "CSC436H1/ ( CSC336H1 (75%))/ equivalent mathematical background"
            )
        ).toStrictEqual([
            { name: "CSC436H1", elaboration: "CSC436H1" },
            { name: "CSC336H1", elaboration: "( CSC336H1 (75%))" },
            {
                name: undefined,
                elaboration: "equivalent mathematical background",
            },
        ])
    })
})

describe("naive tokenizer", () => {
    it("should tokenize a simple expression", () => {
        const tokens = naiveTokenizeList(
            "CSC436H1/ ( CSC336H1 (75%))/ equivalent mathematical background"
        )
        expect(tokens).toStrictEqual([
            "CSC436H1/ ( CSC336H1 (75%))/ equivalent mathematical background",
        ])
    })

    it("should tokenize a simple expression with two tokens", () => {
        const tokens = naiveTokenizeList(
            "CSC436H1/ ( CSC336H1 (75%))/ equivalent mathematical background; CSC209H1/ proficiency in C, C++, or Fortran"
        )
        expect(tokens).toStrictEqual([
            "CSC436H1/ ( CSC336H1 (75%))/ equivalent mathematical background",
            "CSC209H1/ proficiency in C, C++, or Fortran",
        ])
    })

    it("should return a tokenized array stripped of invisible characters", () => {
        expect(
            naiveTokenizeList(
                `CSC207H1/ APS105H1/ APS106H1/ ESC180H1/ CSC180H1; MAT235Y1/​ MAT237Y1/​ MAT257Y1/​ (minimum of 77% in MAT135H1 and MAT136H1)/ (minimum of 73% in MAT137Y1)/ (minimum of 67% in MAT157Y1)/ MAT291H1/ MAT294H1/ (minimum of 77% in MAT186H1, MAT187H1)/ (minimum of 73% in MAT194H1, MAT195H1)/ (minimum of 73% in ESC194H1, ESC195H1); MAT223H1/ MAT240H1/ MAT185H1/ MAT188H1; STA237H1/ STA247H1/ STA255H1/ STA257H1/ STA286H1/ CHE223H1/ CME263H1/ MIE231H1/ MIE236H1/ MSE238H1/ ECE286H1`
            )
        ).toStrictEqual([
            `CSC207H1/ APS105H1/ APS106H1/ ESC180H1/ CSC180H1`,
            `MAT235Y1/ MAT237Y1/ MAT257Y1/ (minimum of 77% in MAT135H1 and MAT136H1)/ (minimum of 73% in MAT137Y1)/ (minimum of 67% in MAT157Y1)/ MAT291H1/ MAT294H1/ (minimum of 77% in MAT186H1, MAT187H1)/ (minimum of 73% in MAT194H1, MAT195H1)/ (minimum of 73% in ESC194H1, ESC195H1)`,
            `MAT223H1/ MAT240H1/ MAT185H1/ MAT188H1`,
            `STA237H1/ STA247H1/ STA255H1/ STA257H1/ STA286H1/ CHE223H1/ CME263H1/ MIE231H1/ MIE236H1/ MSE238H1/ ECE286H1`,
        ])
    })
})
