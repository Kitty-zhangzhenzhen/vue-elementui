<template>
  <div class="main_container">
    <div class="content">
      <chartHeader
        ref="chartHeader"
        @switchChange="switchChange"
        @switchChange2="switchChange2"
      />
      <div class="main">
        <div class="stencil">
          <div id="stencil"></div>
        </div>
        <div class="container">
          <div id="container" class="x6-graph"></div>
        </div>

        <div class="minimap">
          <div id="minimap" />
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./control.js"></script>

<style scoped lang="scss">
.main_container {
  position: relative;
  height: 100%;
  padding: 70px 20px 30px;
  box-sizing: border-box;
  .content {
      background-color: #fff;
      height: 100%;
    .main {
      display: flex;
      .stencil {
        width: 290px;
        position: relative;
      }
      .container {
        width: calc(100% - 290px - 150px);
      }
      .minimap {
        width: 150px;
        background-color: #666;
        #minimap {
          background-color: #666;
          width: 100%;
        }
      }
    }
  }
}
</style>
