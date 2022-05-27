import {
    naiveSplitRequirementGroup,
    naiveTokenizeList,
} from "./parser/tokenize"

const NaiveParser = (reqs: string) => {
    return naiveTokenizeList(reqs).map((reqGroup) =>
        naiveSplitRequirementGroup(reqGroup)
    )
}

const Parser = (reqs: string) => NaiveParser(reqs)

export default Parser
