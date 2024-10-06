<template>
  <div class="graph">
    <div class="dnd">
      <button @mousedown.prevent="addNode('custom1', $event)">
        custom1组件
      </button>
      <button @mousedown.prevent="addNode('bubble-top', $event)">
        bubble-top
      </button>
      <button @mousedown.prevent="addNode('bubble-bottom', $event)">
        bubble-bottom
      </button>
    </div>
    <div class="canvas" ref="canvas"></div>
  </div>

  <div class="fixed">
    <button @click="handleUndo" :disabled="!history.canUndo">撤销</button>
    <button @click="handleRedo" :disabled="!history.canRedo">重做</button>
    <br />
    <button @click="handleSave">保存流程数据</button>
  </div>

  <div v-if="popupNode" class="popup">
    <input v-model="input" />
    <button @click="handleSubmit">保存</button>
  </div>
</template>
<script setup>
import { Graph, Shape } from "@antv/x6";
import { Dnd } from "@antv/x6-plugin-dnd";
import { History } from "@antv/x6-plugin-history";
import { ref, onMounted, useTemplateRef } from "vue";

const dnd = ref(null);
const graph = ref(null);

const input = ref();
const popupNode = ref();
const history = ref({ canUndo: false, canRedo: false });

const canvasRef = useTemplateRef("canvas");
const addNode = (shape, e) => {
  const node = graph.value.createNode({
    shape,
    width: 100,
    height: 40,
    // 删除按钮
    tools: ["button-remove"],
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
        },
        {
          group: "right",
        },
        {
          group: "bottom",
        },
        {
          group: "left",
        },
      ],
    },
  });

  dnd.value.start(node, e);
};

const clickNode = ({ node }) => {
  if (popupNode.value) {
    return;
  }

  popupNode.value = node;
  input.value = node.data?.name;

  // 通过shape判断关联对应的表单
  console.log(node.shape);
  // 表单数据存储在data里
  console.log(node.data);
};

const handleRedo = () => {
  graph.value.redo();
};

const handleUndo = () => {
  graph.value.undo();
};

// 保存节点表单数据
const handleSubmit = () => {
  popupNode.value.data = { name: input.value };
  popupNode.value = null;
};

// 导出数据
const handleSave = () => {
  const json = graph.value.toJSON();
  console.log(json);
};

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
    effect: ["data"],
    html(cell) {
      const name = cell?.getData()?.name;
      const div = document.createElement("div");
      div.className = "bubble-node bubble-bottom";
      div.innerHTML = name;
      return div;
    },
  });

  graph.value = new Graph({
    container: canvasRef.value,
    grid: true,
    background: {
      color: "#F2F7FA",
    },
    mousewheel: {
      enabled: true,
      zoomAtMousePosition: true,
      modifiers: "ctrl",
      minScale: 0.5,
      maxScale: 3,
    },
    connecting: {
      router: "manhattan",
      anchor: "center",
      connectionPoint: "anchor",
      allowBlank: false,
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          attrs: {
            line: {
              stroke: "#f00",
              strokeWidth: 5,
              targetMarker: {
                name: "block",
                width: 12,
                height: 8,
              },
            },
          },
          zIndex: 0,
        });
      },
      validateConnection({ targetMagnet }) {
        return !!targetMagnet;
      },
    },
    highlighting: {
      magnetAdsorbed: {
        name: "stroke",
        args: {
          attrs: {
            fill: "#5F95FF",
            stroke: "#5F95FF",
          },
        },
      },
    },
  });

  dnd.value = new Dnd({
    target: graph.value,
  });

  // 历史操作
  graph.value.use(
    new History({
      enabled: true,
    })
  );

  // 拖放松手时触发弹出表单
  graph.value.on("node:added", clickNode);
  // 节点点击事件
  graph.value.on("node:click", clickNode);

  // 添加删除按钮
  // graph.value.on("cell:mouseenter", ({ cell }) => {
  //   if (cell.isNode()) {
  //     cell.addTools([
  //       {
  //         name: "button-remove",
  //         args: {
  //           x: 0,
  //           y: 0,
  //           offset: { x: 10, y: 10 },
  //         },
  //       },
  //     ]);
  //   }
  // });

  // graph.value.on("cell:mouseleave", ({ cell }) => {
  //   cell.removeTools();
  // });
  // 历史监听
  graph.value.on("history:change", () => {
    history.value = {
      canUndo: graph.value.canUndo(),
      canRedo: graph.value.canRedo(),
    };
  });

  // 控制连接桩显示/隐藏
  const showPorts = (ports, show) => {
    for (let i = 0, len = ports.length; i < len; i += 1) {
      ports[i].style.visibility = show ? "visible" : "hidden";
    }
  };

  graph.value.on("node:mouseenter", () => {
    const container = canvasRef.value;
    const ports = container.querySelectorAll(".x6-port-body");
    showPorts(ports, true);
  });

  graph.value.on("node:mouseleave", () => {
    const container = canvasRef.value;
    const ports = container.querySelectorAll(".x6-port-body");
    showPorts(ports, false);
  });
});
</script>
<style>
button {
  padding: 5px;
}

.graph {
  display: flex;
  width: 100vw;
  height: 100vh;
}

.dnd {
  width: 200px;
  height: 100%;
}

.canvas {
  flex: 1;
  height: 100%;
}

.popup {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: 300px;
  height: 500px;
  background: #eee;
}

.fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 9;
  padding: 50px;
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
