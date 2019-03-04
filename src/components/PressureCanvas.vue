<template>
    <b-container fluid>
        <b-row>
            <b-col>
                <canvas
                    ref="canvas"
                    class='p-canvas w-100'
                    v-on:touchstart="(e) => { e.preventDefault() }"
                    v-on:touchmove="(e) => { e.preventDefault() }"
                    v-on:pointerup="upHandler"
                    v-on:pointermove="processPen"
                    v-on:pointerdown="downHandler">
                </canvas>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h1 class='display-4'>Pressure: {{ pressure }}</h1>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
export default {
  name: 'pressure-canvas',
  data() {
    return {
      x: 0,
      y: 0,
      canvasLeft: null,
      canvasTop: null,
      currentLine: null,
      pressure: null,
      brushSize: 20,
    };
  },
  computed: {
    lineWidth() {
      return this.pressure * this.brushSize;
    },
    brushCanvasSize() {
      return Math.ceil(this.brushSize * 2.1 / 2) * 2;
    },
  },
  mounted() {
    this.canvas = this.$refs.canvas;
    this.canvasCtx = this.canvas.getContext('2d');

    const canvasBoundingRect = this.canvas.getBoundingClientRect();
    // this.brushCanvas = document.createElement("canvas");
    // this.brushCanvasCtx = this.brushCanvas.getContext('2d')
    this.canvasLeft = canvasBoundingRect.left;
    this.canvasTop = canvasBoundingRect.top;

    this.resizeEvents();

    window.addEventListener('resize', this.resizeEvents);


    // console.log(this.brushCanvasSize)
    // // Set the brush canvas heigh and width
    // this.brushCanvas.width = this.brushCanvasSize;
    // this.brushCanvas.height = this.brushCanvasSize;

    // var mid_x = Math.round(this.brushCanvasSize / 2);
    // var left = Math.round(mid_x - this.brushSize/2);
    // // var right = Math.round(mid_x + this.brushSize/2);
    // var mid_y = Math.round(this.brushCanvasSize / 2);
    // var top = Math.round(mid_y - this.brushSize/2);
    // // var bottom = Math.round(mid_y + this.brushSize/2);

    // var center_x = left + this.brushSize/2;
	    // var center_y = top + this.brushSize/2;


    // this.brushCanvasCtx.beginPath();
    // this.brushCanvasCtx.ellipse(center_x, center_y, this.brushSize / 2, this.brushSize / 2, 0, Math.PI + Math.PI, false);
    // this.brushCanvasCtx.stroke();
    // this.brushCanvasCtx.fill();
  },
  methods: {
    /**
         * Perform events on resize
         */
    resizeEvents(event) {
      const {
        clientWidth, clientHeight, width, height,
      } = this.canvas;
      // Check for canvas resize
      if (clientWidth != width || clientHeight != height) {
        this.canvas.width = clientWidth;
        this.canvas.height = clientHeight;
      }

      const canvasBoundingRect = this.canvas.getBoundingClientRect();
      // this.brushCanvas = document.createElement("canvas");
      // this.brushCanvasCtx = this.brushCanvas.getContext('2d')
      this.canvasLeft = canvasBoundingRect.left;
      this.canvasTop = canvasBoundingRect.top;
    },
    upHandler(event) {
      this.pressure = null;
    },
    downHandler(event) {
      this.x = event.clientX - this.canvasLeft;
      this.y = event.clientY - this.canvasTop;
    },
    changePressure({ pressure }) {
      this.pressure = pressure;
    },
    processPen(event) {
      if ((event.buttons != 1 && event.buttons != 32) || event.pointerType != 'pen') return;
      this.changePressure(event);
      this.canvasCtx.beginPath();
      this.canvasCtx.lineWidth = this.lineWidth;
      this.canvasCtx.lineCap = 'round';
      this.canvasCtx.strokeStyle = '#000000';
      this.canvasCtx.moveTo(this.x, this.y);
      this.x = event.clientX - this.canvasLeft;
      this.y = event.clientY - this.canvasTop;
      this.canvasCtx.lineTo(this.x, this.y);
      this.canvasCtx.stroke();


      // console.log(event)

      // this.canvasCtx.drawImage(this.brushCanvas, Math.ceil(event.x - this.brushCanvasSize/ 2), Math.ceil(event.y - this.brushCanvasSize/ 2));
    },
  },

};
</script>

<style>
.p-canvas {
    background-color: #ececec;
    /* width: 85vw; */
    height: 80vh;
}
</style>
