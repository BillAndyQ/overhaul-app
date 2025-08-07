import React from "react"
import ChartUI from "@/components/charts/ChartUI"
import FlexRow from "@/components/flex/FlexRow"

export default function Charts(){
    return (
        <div>
            <FlexRow>
                <ChartUI/>
                <ChartUI/>
                <ChartUI/>
            </FlexRow>
            <FlexRow>
                <ChartUI/>
                <ChartUI/>
                <ChartUI/>
                <ChartUI/>
            </FlexRow>
        </div>
    )
}