<template>
    <el-row id="chartHeader">
        <el-row>
            <el-tooltip class="item" effect="dark" content="清除 (Cmd + D)" placement="bottom">
                <el-button @click="handleClick" name="delete" icon="el-icon-delete" size="mini">
                </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="撤销 (Cmd + Z)" placement="bottom">
                <el-button :disabled="!canUndo" @click="handleClick" name="undo" icon="el-icon-refresh-left"
                    size="mini">
                </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="Redo (Cmd + Shift + Z)" placement="bottom">
                <el-button :disabled="!canRedo" @click="handleClick" name="redo" icon="el-icon-refresh-right"
                    size="mini">
                </el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="复制 (Cmd + Shift + Z)" placement="bottom">
                <el-button @click="handleClick" name="copy" icon='el-icon-document-copy' size="mini"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="剪切 (Cmd + X)" placement="bottom">
                <el-button @click="handleClick" name="cut" icon="el-icon-scissors" size="mini"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="粘贴 (Cmd + V)" placement="bottom">
                <el-button @click="handleClick" name="paste" icon="el-icon-copy-document" size="mini"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="保存PNG (Cmd + S)" placement="bottom">
                <el-button @click="handleClick" name="savePNG" icon="el-icon-download" size="mini">png</el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="保存SVG (Cmd + S)" placement="bottom">
                <el-button @click="handleClick" name="saveSVG" icon="el-icon-download" size="mini">svg</el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="打印 (Cmd + P)" placement="bottom">
                <el-button @click="handleClick" name="print" icon="el-icon-printer" size="mini"></el-button>
            </el-tooltip>

            <el-tooltip class="item" effect="dark" content="toJSON" placement="bottom">
                <el-button @click="handleClick" name="toJSON" size="mini">toJSON</el-button>
            </el-tooltip>
        </el-row>

        <el-row>
            <el-col :span="12">
                <el-switch v-model="value" @change="change1" active-color="#13ce66" inactive-color="#ff4949"
                    active-text="点选/框选(开)" inactive-text="点选/框选(关)">
                </el-switch>
            </el-col>
            <el-col :span="12">
                <el-switch v-model="value2" @change="change2" active-color="#13ce66" inactive-color="#ff4949"
                    active-text="画布拖拽(开)" inactive-text="画布拖拽(关)">
                </el-switch>
            </el-col>
        </el-row>

    </el-row>
</template>

<script >
/* eslint-disable */
import FlowGraph from "../../graph";
import { DataUri } from "@antv/x6";
export default {
    props: {
        // value: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    data() {
        return {
            value: false,
            value2: false,
            canUndo: "",
            canRedo: "",
        };
    },
    mounted() {
        setTimeout(() => {
            this.initEvent();
        }, 200);
    },
    methods: {
        change1(e) {
            this.$emit("switchChange", e);
        },
        change2(e) {
            this.$emit("switchChange2", e);
        },
        initEvent() {
            const { graph } = FlowGraph;
            const { history } = graph;
            console.log("[ history ]-97", history);
            history.on("change", () => {
                this.canUndo = history.canUndo();
                this.canRedo = history.canRedo();
            });
            graph.bindKey("ctrl+z", () => {
                if (history.canUndo()) {
                    history.undo();
                }
                return false;
            });
            graph.bindKey("ctrl+shift+z", () => {
                if (history.canRedo()) {
                    history.redo();
                }
                return false;
            });
            graph.bindKey("ctrl+d", () => {
                graph.clearCells();
                return false;
            });
            graph.bindKey("ctrl+s", () => {
                graph.toPNG((datauri) => {
                    DataUri.downloadDataUri(datauri, "chart.png");
                });
                return false;
            });
            graph.bindKey("ctrl+p", () => {
                graph.printPreview();
                return false;
            });
            graph.bindKey("ctrl+c", this.copy);
            graph.bindKey("ctrl+v", this.paste);
            graph.bindKey("ctrl+x", this.cut);
        },
        copy() {
            const { graph } = FlowGraph;
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.copy(cells);
            }
            return false;
        },
        cut() {
            const { graph } = FlowGraph;
            const cells = graph.getSelectedCells();
            if (cells.length) {
                graph.cut(cells);
            }
            return false;
        },
        paste() {
            const { graph } = FlowGraph;
            if (!graph.isClipboardEmpty()) {
                const cells = graph.paste({ offset: 32 });
                graph.cleanSelection();
                graph.select(cells);
            }
            return false;
        },
        handleClick(event) {
            const { graph } = FlowGraph;
            const name = event.currentTarget.name;
            switch (name) {
                case "undo":
                    graph.history.undo();
                    break;
                case "redo":
                    graph.history.redo();
                    break;
                case "delete":
                    graph.clearCells();
                    break;
                case "savePNG":
                    graph.toPNG(
                        (dataUri) => {
                            // 下载
                            DataUri.downloadDataUri(dataUri, "chartx.png");
                        },
                        {
                            backgroundColor: "white",
                            padding: {
                                top: 20,
                                right: 30,
                                bottom: 40,
                                left: 50,
                            },
                            quality: 1,
                        }
                    );
                    break;
                case "saveSVG":
                    graph.toSVG((dataUri) => {
                        // 下载
                        DataUri.downloadDataUri(
                            DataUri.svgToDataUrl(dataUri),
                            "chart.svg"
                        );
                    });
                    break;
                case "print":
                    graph.printPreview();
                    break;
                case "copy":
                    this.copy();
                    break;
                case "cut":
                    this.cut();
                    break;
                case "paste":
                    this.paste();
                    break;
                case "toJSON":
                    console.log("[ graph.toJSON() ]===>", graph.toJSON());
                    alert("见打印");
                    break;
                default:
                    break;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
#chartHeader {
    padding: 15px 15px 0 15px;
}
</style>
