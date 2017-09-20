const float PI = 3.1415926535;

float scale = 2.;

//stolen and modified from las @ pouet.net
vec3 hsv(in float h, in float s, in float v, in vec3 p){
    return mix(	vec3(1.),
               	clamp(	(abs(fract(h+(p/3.))*6.-3.)-1.),
                   		0.,
                   		1.),
            	s)
    	*v;
}

vec3 palette(){
    float t = iTime * 2.;
    float r = cos(t) + 2.;
    float g = 0.;
    float b = cos((t + PI)*.25) + 2.;
    return vec3(r,g,b);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float t = iTime * 2.;
	vec2 uv = -1. + 2.*(fragCoord.xy / iResolution.xy);
    uv.x *= iResolution.x/iResolution.y*.5+.5;
    uv *= scale;
    
    float a = .5;
    float b = .4;
    
    vec2 point = vec2(cos(t*a + PI/2.), sin(t*b))*4.;
    
    float cola = cos(distance(uv, point));
                     
    float colb = cos(distance(uv + t*1., vec2(0.)));
    
    float colc = cos(uv.x + t*.5);
    
	fragColor = vec4(hsv((cola + colb + colc)/3., 1., 1., palette()) ,1.0);
}
