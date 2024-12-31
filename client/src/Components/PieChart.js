import CanvasJSReact from "@canvasjs/react-charts";
import { Flex } from "@chakra-ui/react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const PieChart = () => {
  const options = {
    animationEnabled: true,
    backgroundColor: "transparent",
    data: [
      {
        type: "pie",
        toolTipContent: "{label}: <strong>{y}0M Tokens</strong>",
        // indexLabelPlacement: "inside",
        indexLabelFontSize: 20,
        indexLabelFontColor: "cyan",
        indexLabel: "{label} - {y}%",
        dataPoints: [
          { y: 40, label: "Presale", color: "#72b4eb" },
          { y: 24, label: "Liquidity Pool", color: "#8464a0" },
          { y: 14, label: "Team Allocations", color: "#ea5f89" },
          { y: 14, label: "Staking", color: "#f7b7a3" },
          { y: 4, label: "Airdrops", color: "#cea9bc" },
          { y: 4, label: "Auto-Burn", color: "#9ecae1" },
        ],
      },
    ],
  };

  return (
    <Flex
      p={4}
      mx="auto"
      borderRadius="lg"
      boxShadow="md"
      justifyContent="center"
      width="full"
    >
      <CanvasJSChart options={options} />
    </Flex>
  );
};

export default PieChart;
