import { Chart, LineAdvance } from "bizcharts";


const data = [
    {
        month: "Jan",
        city: "DC",
        temperature: 88,
    },
    {
        month: "Feb",
        city: "Orlando",
        temperature: 100,
    },
    {
        month: "Mar",
        city: "Brisbane",
        temperature: 34,
    },
    {
        month: "Apr",
        city: "Portland",
        temperature: 54,
    },
    {
        month: "May",
        city: "Austin",
        temperature: 71,
    },
];

<Chart padding={[10, 20, 50, 40]} autofit height={300} data={props.data}>
    <LineAdvance
        shap="smooth"
        point
        area
        position="month*temperature"
        color="city"
    />
</Chart>;

<Dashboard dashboardData={dashboardData}  data={data}/>