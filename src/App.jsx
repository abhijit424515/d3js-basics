import { useEffect } from "react";

export default function App() {
	useEffect(() => {
		d3.selectAll("p")
			.style("color", "red")
			.attr("class", "first")
			.text("hello");
		d3.select("body").append("p").text("hello again");

		d3.selectAll("p").style("background-color", "blue");
	}, []);

	return (
		<>
			<p>H</p>
			<p>H</p>
			<p>H</p>
			<p>H</p>
		</>
	);
}
