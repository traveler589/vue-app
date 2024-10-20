<template>
  <div ref="graph" class="graph" />
</template>
<script setup>
import { Graph, Shape } from "@antv/x6";
import { onMounted, useTemplateRef } from "vue";

const graphRef = useTemplateRef("graph");

onMounted(() => {
  Graph.registerNode("custom1", {
    inherit: "rect",
  });

  Shape.HTML.register({
    shape: "bubble-top",
    width: 160,
    height: 80,
    effect: ["data"],
    html(cell) {
      const name = cell?.getData()?.name;
      const div = document.createElement("div");
      div.className = "bubble-node bubble-top";
      div.innerHTML = name;
      return div;
    },
  });

  Shape.HTML.register({
    shape: "bubble-bottom",
    width: 160,
    height: 80,
    html(cell) {
      const name = cell?.getData()?.name;
      const div = document.createElement("div");
      div.className = "bubble-node bubble-bottom";
      div.innerHTML = name;
      return div;
    },
  });

  const graph = new Graph({
    container: graphRef.value,
    // 纯预览
    interacting: false,
    connecting: {
      router: "manhattan",
    },
  });

  const json = {
    cells: [
      {
        shape: "edge",
        attrs: {
          line: {
            stroke: "#f00",
            strokeWidth: 5,
            targetMarker: {
              tagName: "path",
              fill: "yellow",
              strokeWidth: 2,
              d: "M 20 -10 0 0 20 10 Z",
            },
          },
        },
        id: "2dcd3553-f77d-4c5e-b805-28b42b287c3d",
        zIndex: 0,
        source: {
          cell: "350dd54c-97dd-4cf9-adb7-3d1fb0d2bc08",
          port: "eab750f5-28dc-4869-ac86-ef1d2922cf0d",
        },
        target: {
          cell: "7b88fa08-0fb1-4571-9844-677a88c0227b",
          port: "cf53ff86-a08c-467a-a787-da04afb242d0",
        },
      },
      {
        shape: "edge",
        attrs: {
          line: {
            stroke: "#f00",
            strokeWidth: 5,
            targetMarker: {
              tagName: "path",
              fill: "yellow",
              strokeWidth: 2,
              d: "M 20 -10 0 0 20 10 Z",
            },
          },
        },
        id: "b9189c7f-5d81-49ec-a6de-42c02280ccb4",
        zIndex: 0,
        source: {
          cell: "350dd54c-97dd-4cf9-adb7-3d1fb0d2bc08",
          port: "142ebf2b-6899-43a6-920a-d526b4504909",
        },
        target: {
          cell: "20ae00fc-edb3-40ff-8f9e-db72cd8856f4",
          port: "903ce506-5533-4d6e-a320-63658d36306b",
        },
      },
      {
        position: {
          x: 70,
          y: 30,
        },
        size: {
          width: 100,
          height: 40,
        },
        visible: true,
        shape: "custom1",
        id: "350dd54c-97dd-4cf9-adb7-3d1fb0d2bc08",
        tools: {
          items: ["button-remove"],
        },
        ports: {
          groups: {
            top: {
              position: "top",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            right: {
              position: "right",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            bottom: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            left: {
              position: "left",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
          },
          items: [
            {
              group: "top",
              id: "e9642c45-7ae0-418e-a35b-ca4b76225d41",
            },
            {
              group: "right",
              id: "eab750f5-28dc-4869-ac86-ef1d2922cf0d",
            },
            {
              group: "bottom",
              id: "142ebf2b-6899-43a6-920a-d526b4504909",
            },
            {
              group: "left",
              id: "ac95ec11-ea73-4760-a222-26243c741f45",
            },
          ],
        },
        zIndex: 1,
        data: {
          name: "1231231231231",
        },
      },
      {
        position: {
          x: 520,
          y: 210,
        },
        size: {
          width: 100,
          height: 40,
        },
        visible: true,
        shape: "custom1",
        id: "7b88fa08-0fb1-4571-9844-677a88c0227b",
        tools: {
          items: ["button-remove"],
        },
        ports: {
          groups: {
            top: {
              position: "top",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            right: {
              position: "right",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            bottom: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            left: {
              position: "left",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
          },
          items: [
            {
              group: "top",
              id: "cf53ff86-a08c-467a-a787-da04afb242d0",
            },
            {
              group: "right",
              id: "59e067a6-1ca9-4efb-83c3-726eb514b7d7",
            },
            {
              group: "bottom",
              id: "882bbc0e-4985-4a83-9378-1e59abf2c394",
            },
            {
              group: "left",
              id: "39a4703e-b8ac-47f9-a8d8-7c5cbcdb6d85",
            },
          ],
        },
        zIndex: 2,
      },
      {
        position: {
          x: 80,
          y: 200,
        },
        size: {
          width: 100,
          height: 40,
        },
        view: "html-view",
        shape: "bubble-bottom",
        id: "20ae00fc-edb3-40ff-8f9e-db72cd8856f4",
        tools: {
          items: ["button-remove"],
        },
        ports: {
          groups: {
            top: {
              position: "top",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            right: {
              position: "right",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            bottom: {
              position: "bottom",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
            left: {
              position: "left",
              attrs: {
                circle: {
                  r: 4,
                  magnet: true,
                  stroke: "#5F95FF",
                  strokeWidth: 1,
                  fill: "#fff",
                  style: {
                    visibility: "hidden",
                  },
                },
              },
            },
          },
          items: [
            {
              group: "top",
              id: "903ce506-5533-4d6e-a320-63658d36306b",
            },
            {
              group: "right",
              id: "3c149234-a18b-4007-97fe-ae1e881a37d3",
            },
            {
              group: "bottom",
              id: "7c6daddf-2b28-4359-b504-d06dca53a492",
            },
            {
              group: "left",
              id: "d5d14a1c-efeb-493f-bcea-ee9bdfb1f3c2",
            },
          ],
        },
        zIndex: 3,
        data: {
          name: "山脉东南分别是东方时空",
        },
      },
    ],
  };

  graph.fromJSON(json.cells);
});
</script>
<style>
.graph {
  width: 100vw;
  height: 100vh;
}

.bubble-node {
  position: relative;
  width: 200px;
  min-height: 60px;
  padding: 5px;
  font-size: 14px;
  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    border-radius: 4px;
    border: 1px solid orange;
  }

  &::after {
    content: "";
    position: absolute;
    left: calc(50% - 6px);
    width: 10px;
    height: 10px;
    border: 1px solid orange;
    clip-path: polygon(0 0, 0 100%, 100% 100%);
  }
}

.bubble-top {
  &::before {
    clip-path: polygon(
      0 0,
      100% 0,
      100% 100%,
      calc(50% + 8px) 100%,
      50% calc(100% - 8px),
      calc(50% - 8px) 100%,
      0 100%
    );
  }

  &::after {
    bottom: -5px;
    transform: rotate(-45deg);
  }
}

.bubble-bottom {
  &::before {
    clip-path: polygon(
      calc(50% - 8px) 0,
      50% 8px,
      calc(50% + 8px) 0,
      100% 0,
      100% 100%,
      0 100%,
      0 0
    );
  }

  &::after {
    top: -5px;
    transform: rotate(135deg);
  }
}
</style>
