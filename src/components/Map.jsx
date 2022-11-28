import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import RAW from "../assets/S07_AC.json";

export default function Map() {
	const d3Chart = useRef();

	const dataset = RAW.features;
	console.log(dataset[0].geometry.coordinates[0]);

	useEffect(() => {
		let x_min = 10000,
			x_max = 0;
		let y_min = 10000,
			y_max = 0;
		for (let i = 0; i < dataset.length; i++) {
			for (let k = 0; k < dataset[i].geometry.coordinates[0].length; k++) {
				x_min = Math.min(x_min, dataset[i].geometry.coordinates[0][k][0]);
				y_min = Math.min(y_min, dataset[i].geometry.coordinates[0][k][1]);
				x_max = Math.max(x_max, dataset[i].geometry.coordinates[0][k][0]);
				y_max = Math.max(y_max, dataset[i].geometry.coordinates[0][k][1]);
			}
		}

		const margin = { top: 0, right: 0, bottom: 0, left: 0 };
		const height =
			parseInt(d3.select("#d3").style("height")) - margin.top - margin.bottom;
		const width = ((y_max - y_min) * height) / (x_max - x_min);

		var vis = d3
				.select(d3Chart.current)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom),
			scaleX = d3.scaleLinear().domain([x_min, x_max]).range([0, width]),
			scaleY = d3.scaleLinear().domain([y_min, y_max]).range([height, 0]),
			poly = dataset;

		vis
			.selectAll("polygon")
			.data(poly)
			.enter()
			.append("polygon")
			.attr("points", function (p) {
				return p.geometry.coordinates[0]
					.map(function (q) {
						return [scaleX(q[0]), scaleY(q[1])].join(",");
					})
					.join(" ");
			})
			.attr("fill", "none")
			.attr("stroke", "black")
			.attr("stroke-width", 2);
	}, []);

	return (
		<div id="d3" className="h-4/5">
			<svg ref={d3Chart}></svg>
		</div>
	);
}
