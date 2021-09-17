//gl context initilized
const canvas = document.getElementById('gl-canvas');
const gl = canvas.getContext('webgl2');



//Shader para posiciones
const vertexShader = `#version 300 es
precision mediump float;

in vec2 position;
in vec3 iColor;
out vec3 oColor;
uniform float iTime;
uniform mat4 modelMatrix;
uniform mat4 viewMatrix;
uniform mat4 projectionMatrix;

void main()
{
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 0, 1);
    oColor = iColor;
}
`;

//shader para color
const fragmentShader = `#version 300 es
precision mediump float;

out vec4 fragColor;
in vec3 oColor;

void main()
{
    fragColor = vec4(oColor, 1);
}
`;

const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);

gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}
if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

//Drawing basic triangle
const triangleCoords = [
    -5.3, 5.3,
    -5.3, -5.3,
    5.3, -5.3,
    5.3, 5.3,
    //origin
    -0.2, -0.6,
    -0.2, -1,
    0.2, -1,
    0.2, -0.6,
    //
    //left side
    -0.6, -0.6,
    -0.6, -1,
    -0.2, -1,
    -0.2, -0.6,
    
    -1, -0.6,
    -1, -1,
    -0.6, -1,
    -0.6, -0.6,
    
    -1, -1,
    -1, -1.4,
    -0.6, -1.4,
    -0.6, -1,
    
    -2.2, -1.4,
    -2.2, -1.8,
    -0.6, -1.8,
    -0.6, -1.4,
    
    -2.2, 1.8,
    -2.2, -1.4,
    -1.8, -1.4,
    -1.8, 1.8,
    //primera linea
    -1.8, 0.2,
    -1.8, -1.4,
    -1.4, -1.4,
    -1.4, 0.2,
    
    -1.8, 1.8,
    -1.8, 0.2,
    -1.4, 0.2,
    -1.4, 1.8,
    //
    //segunda linea
    -1.4, -0.2,
    -1.4, -1.4,
    -1.0, -1.4,
    -1.0, -0.2,
    
    -1.4, 1.4,
    -1.4, -0.2,
    -1.0, -0.2,
    -1.0, 1.4,
    //
    //tercera linea
    -1.0, -0.2,
    -1.0, -0.6,
    -0.6, -0.6,
    -0.6, -0.2,
    
    -1.0, 1.4,
    -1.0, -0.2,
    -0.6, -0.2,
    -0.6, 1.4,
    //
    //cuarta linea
    -0.6, -0.2,
    -0.6, -0.6,
    0.2, -0.6,
    0.2, -0.2,
    
    -0.6, 1.0,
    -0.6, -0.2,
    0.2, -0.2,
    0.2, 1.0,
    //

    //lado derecho interno
    
    //quinta linea
    1.8, 1,
    1.8, -1.4,
    1.4, -1.4,
    1.4, 1,
    
    1.8, 1.8,
    1.8, 1,
    1.4, 1,
    1.4, 1.8,
    //
    //sexta linea
    1.4, 0.6,
    1.4, -1.4,
    1.0, -1.4,
    1.0, 0.6,
    
    1.4, 1.4,
    1.4, 0.6,
    1.0, 0.6,
    1.0, 1.4,
    //
    //septima linea
    1.0, 0.2,
    1.0, -0.6,
    0.6, -0.6,
    0.6, 0.2,
    
    1.0, 1.4,
    1.0, 0.2,
    0.6, 0.2,
    0.6, 1.4,
    //

    //octava linea
    0.6, -0.2,
    0.6, -0.6,
    0.2, -0.6,
    0.2, -0.2,
    
    0.6, 1.0,
    0.6, -0.2,
    0.2, -0.2,
    0.2, 1.0,
    //

    //right side
    0.6, -0.6,
    0.6, -1,
    0.2, -1,
    0.2, -0.6,
    
    1, -0.6,
    1, -1,
    0.6, -1,
    0.6, -0.6,
    
    1, -1,
    1, -1.4,
    0.6, -1.4,
    0.6, -1,
    
    2.2, -1.4,
    2.2, -1.8,
    0.6, -1.8,
    0.6, -1.4,
    
    2.2, 2.2,
    2.2, -1.4,
    1.8, -1.4,
    1.8, 2.2,

    //mochila interior
    3.0, 1,
    3.0, -0.2,
    2.6, -0.2,
    2.6, 1,
    
    3.0, 1.8,
    3.0, 1,
    2.6, 1,
    2.6, 1.8,

    3.4, 1,
    3.4, -0.2,
    3.0, -0.2,
    3.0, 1,
    
    3.4, 1.8,
    3.4, 1,
    3.0, 1,
    3.0, 1.8,
    //

    //mochila outline
    2.6, 1.8,
    2.6, -0.2,
    2.2, -0.2,
    2.2, 1.8,

    3.8, 1.8,
    3.8, -0.2,
    3.4, -0.2,
    3.4, 1.8,

    3.8, -0.2,
    3.8, -0.6,
    2.2, -0.6,
    2.2, -0.2,

    3.8, 1.8,
    3.8, 2.2,
    2.2, 2.2,
    2.2, 1.8,
    //
    //outline izq
    -1.8, 2.2,
    -1.8, 1.8,
    -1.4, 1.8,
    -1.4, 2.2,

    -1.4, 1.8,
    -1.4, 1.4,
    -0.6, 1.4,
    -0.6, 1.8,

    -0.6, 1.4,
    -0.6, 1.0,
    0.2, 1.0,
    0.2, 1.4,

    -1.4, 2.6,
    -1.4, 2.2,
    -0.6, 2.2,
    -0.6, 2.6,

    -0.6, 2.6,
    -0.6, 1.8,
    -0.2, 1.8,
    -0.2, 2.6,
    
    -1.0, 3.0,
    -1.0, 2.6,
    -0.6, 2.6,
    -0.6, 3.0,
    
    -1.4, 3.8,
    -1.4, 3.0,
    -1.0, 3.0,
    -1.0, 3.8,
    
    -1.0, 4.2,
    -1.0, 3.4,
    -0.6, 3.4,
    -0.6, 4.2,
    
    -0.6, 4.2,
    -0.6, 3.8,
    -0.2, 3.8,
    -0.2, 4.2,
    //hueso 
    -1.0, 3.4,
    -1.0, 3.0,
    -0.6, 3.0,
    -0.6, 3.4,
    
    -0.6, 3.8,
    -0.6, 2.6,
    -0.2, 2.6,
    -0.2, 3.8,
    //sangre
    -1.4, 2.2,
    -1.4, 1.8,
    -0.6, 1.8,
    -0.6, 2.2,

    //outline der
    1.8, 2.2,
    1.8, 1.8,
    1.4, 1.8,
    1.4, 2.2,

    1.4, 1.8,
    1.4, 1.4,
    0.6, 1.4,
    0.6, 1.8,

    0.6, 1.4,
    0.6, 1.0,
    0.2, 1.0,
    0.2, 1.4,

    1.4, 2.6,
    1.4, 2.2,
    0.6, 2.2,
    0.6, 2.6,

    0.6, 2.6,
    0.6, 1.8,
    0.2, 1.8,
    0.2, 2.6,
    
    1.0, 3.0,
    1.0, 2.6,
    0.6, 2.6,
    0.6, 3.0,
    
    1.4, 3.8,
    1.4, 3.0,
    1.0, 3.0,
    1.0, 3.8,
    
    1.0, 4.2,
    1.0, 3.4,
    0.6, 3.4,
    0.6, 4.2,
    
    0.6, 4.2,
    0.6, 3.8,
    0.2, 3.8,
    0.2, 4.2,
    //hueso 
    1.0, 3.4,
    1.0, 3.0,
    0.6, 3.0,
    0.6, 3.4,
    
    0.6, 3.8,
    0.6, 2.6,
    0.2, 2.6,
    0.2, 3.8,
    //sangre
    1.4, 2.2,
    1.4, 1.8,
    0.6, 1.8,
    0.6, 2.2,

    0.6, 1.8,
    0.6, 1.4,
    -0.6, 1.4,
    -0.6, 1.8,
    //hueso medio
    0.2, 3.4,
    0.2, 1.8,
    -0.2, 1.8,
    -0.2, 3.4,
    //final medio outlone
    0.2, 3.8,
    0.2, 3.4,
    -0.2, 3.4,
    -0.2, 3.8,

    /* -0.2, 0.2,
    0.2, -0.2,
    0.2, 0.2 */
];

const vertexColorArray = [
    1, 1, 1, //r
    1, 1, 1, //g
    1, 1, 1, //b
    1, 1, 1,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,
    
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,
    
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,
    
    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,
    
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,

    0, 0.6, 0.7, //r
    0, 0.6, 0.7, //g
    0, 0.6, 0.7, //b
    0, 0.6, 0.7,
    
    0, 0.8, 0.8, //r
    0, 0.8, 0.8, //g
    0, 0.8, 0.8, //b
    0, 0.8, 0.8,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    //izq
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0.9, 0.9, 0.9, //r
    0.9, 0.9, 0.9, //g
    0.9, 0.9, 0.9, //b
    0.9, 0.9, 0.9,

    0.9, 0.9, 0.9, //r
    0.9, 0.9, 0.9, //g
    0.9, 0.9, 0.9, //b
    0.9, 0.9, 0.9,

    1, 0, 0, //r
    1, 0, 0, //g
    1, 0, 0, //b
    1, 0, 0,

    //der
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,

    0.9, 0.9, 0.9, //r
    0.9, 0.9, 0.9, //g
    0.9, 0.9, 0.9, //b
    0.9, 0.9, 0.9,

    0.9, 0.9, 0.9, //r
    0.9, 0.9, 0.9, //g
    0.9, 0.9, 0.9, //b
    0.9, 0.9, 0.9,

    1, 0, 0, //r
    1, 0, 0, //g
    1, 0, 0, //b
    1, 0, 0,

    1, 0, 0, //r
    1, 0, 0, //g
    1, 0, 0, //b
    1, 0, 0,
    
    0.9, 0.9, 0.9, //r
    0.9, 0.9, 0.9, //g
    0.9, 0.9, 0.9, //b
    0.9, 0.9, 0.9,
    
    0, 0, 0, //r
    0, 0, 0, //g
    0, 0, 0, //b
    0, 0, 0,
    
/* 
    1, 1, 0,
    0.5, 0, 0.5,
    0, 1, 0.5 */
];

const indexArray = [
    0, 1, 2,
    0, 2, 3,
    4, 5, 6,
    4, 6, 7,
    8, 9, 10,
    8, 10, 11,
    12, 13, 14,
    12, 14, 15,
    16, 17, 18,
    16, 18, 19,
    20, 21, 22,
    20, 22, 23,
    24, 25, 26,
    24, 26, 27,
    28, 29, 30,
    28, 30, 31,
    32, 33, 34,
    32, 34, 35,
    36, 37, 38,
    36, 38, 39,
    40, 41, 42,
    40, 42, 43,
    44, 45, 46,
    44, 46, 47,
    48, 49, 50,
    48, 50, 51,
    52, 53, 54,
    52, 54, 55,
    56, 57, 58,
    56, 58, 59,
    60, 61, 62,
    60, 62, 63,
    64, 65, 66,
    64, 66, 67,
    68, 69, 70,
    68, 70, 71,
    72, 73, 74,
    72, 74, 75,
    76, 77, 78,
    76, 78, 79,
    80, 81, 82,
    80, 82, 83,
    84, 85, 86,
    84, 86, 87,
    88, 89, 90,
    88, 90, 91,
    92, 93, 94,
    92, 94, 95,
    96, 97, 98,
    96, 98, 99,
    100, 101, 102,
    100, 102, 103,
    104, 105, 106,
    104, 106, 107,
    108, 109, 110,
    108, 110, 111,
    112, 113, 114,
    112, 114, 115,
    116, 117, 118,
    116, 118, 119,
    120, 121, 122,
    120, 122, 123,
    124, 125, 126,
    124, 126, 127,
    128, 129, 130,
    128, 130, 131,
    132, 133, 134,
    132, 134, 135,
    136, 137, 138,
    136, 138, 139,
    140, 141, 142,
    140, 142, 143,
    //izq
    144, 145, 146,
    144, 146, 147,
    148, 149, 150,
    148, 150, 151,
    152, 153, 154,
    152, 154, 155,
    156, 157, 158,
    156, 158, 159,
    160, 161, 162,
    160, 162, 163,
    164, 165, 166,
    164, 166, 167,
    168, 169, 170,
    168, 170, 171,
    172, 173, 174,
    172, 174, 175,
    176, 177, 178,
    176, 178, 179,
    180, 181, 182,
    180, 182, 183,
    184, 185, 186,
    184, 186, 187,
    188, 189, 190,
    188, 190, 191,
    //der
    192, 193, 194,
    192, 194, 195,
    196, 197, 198,
    196, 198, 199,
    200, 201, 202,
    200, 202, 203,
    204, 205, 206,
    204, 206, 207,
    208, 209, 210,
    208, 210, 211,
    212, 213, 214,
    212, 214, 215,
    216, 217, 218,
    216, 218, 219,
    220, 221, 222,
    220, 222, 223,
    224, 225, 226,
    224, 226, 227,
    228, 229, 230,
    228, 230, 231,
    232, 233, 234,
    232, 234, 235,
    236, 237, 238,
    236, 238, 239,
    240, 241, 242,
    240, 242, 243,
    244, 245, 246,
    244, 246, 247,
    248, 249, 250,
    248, 250, 251,

];

const indexArrayBuffer = gl.createBuffer();
const vertexColorBuffer = gl.createBuffer();
const positionBuffer = gl.createBuffer();

let now = Date.now();

const uniformTime = gl.getUniformLocation(program, 'iTime');
const uModelMatrix = gl.getUniformLocation(program, 'modelMatrix');
const uViewMatrix = gl.getUniformLocation(program, 'viewMatrix');
const uProjectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
const attribVertexColor = gl.getAttribLocation(program, 'iColor');
const attribPosition = gl.getAttribLocation(program, 'position');

const modelMatrix = mat4.create();
const viewMatrix = mat4.create();
const projectionMatrix = mat4.create();

const axis = {
    x:0,
    y:0
};

const ArrowKeys = ()=>{
    addEventListener('keydown', ({key}) => {
        console.log(key);
        axis.x = key === 'a' ? -1 : key === 'd' ? 1 : 0;
        axis.y = key === 's' ? -1 : key === 'w' ? 1 : 0;
        //console.log(axis);
    });
    addEventListener('keyup', ({key}) => {
        console.log(key);
        axis.x = (key === 'a' || key === 'd') ? 0 : axis.x;
        axis.y = (key === 's' || key === 'w') ? 0 : axis.y;
        //console.log(axis);
    });
};



ArrowKeys();

/* mat4.scale(
    modelMatrix,
    modelMatrix,
    [1, 1, 1]
); */

mat4.translate(
    modelMatrix,
    modelMatrix,
    [0, 0, -13]
);





const update = ()=> {
    //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexArrayBuffer);

    const deltaTime = (Date.now() - now) / 1000;
    now = Date.now();
    //console.log(deltaTime/1000);

    /* mat4.rotate(
        modelMatrix,
        modelMatrix,
        deltaTime / 10000,
        [0, 0, 1]
    ); */

    mat4.translate(
        modelMatrix,
        modelMatrix,
        [axis.x * deltaTime, axis.y * deltaTime, 0]
    );
    
    
    mat4.perspective(
        projectionMatrix,
        45 * (Math.PI / 180),
        canvas.clientWidth / canvas.clientHeight,
        1,
        1000
    );
    

    //clear screen
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    
    gl.uniform1f(uniformTime, deltaTime / 1000);

    gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix);
    gl.uniformMatrix4fv(uViewMatrix, false, viewMatrix);
    gl.uniformMatrix4fv(uProjectionMatrix, false, projectionMatrix);

    //
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexColorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColorArray), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(attribVertexColor);
    gl.vertexAttribPointer(attribVertexColor, 3, gl.FLOAT, gl.FALSE, 0, 0);

    //Reservamos memoria en la tarjeta de video (Vram)
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(attribPosition);
    gl.vertexAttribPointer(attribPosition, 2, gl.FLOAT, gl.FALSE, 0, 0);

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexArrayBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indexArray), gl.STATIC_DRAW);

    gl.drawElements(gl.TRIANGLES, indexArray.length, gl.UNSIGNED_SHORT, 0);
    //gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(update);
};

requestAnimationFrame(update);