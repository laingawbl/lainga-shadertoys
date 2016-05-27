//https://www.shadertoy.com/view/XtSSDm

float X_OFFSET 	= 0.5;
float Y_OFFSET 	= 0.5;
float ZOOM	= 0.4;	//Scale to display the set at; reduce if it goes off the sides
float POW_LIMIT = 3.0;	//Adjust the maximum power the cycle reaches
float CONTOUR	= 0.2;	//Scale of the colour contours around the fractal

vec2 zPow(vec2 z, float c){
    float arg = atan(z.y, z.x);
	return pow(length(z), c) * vec2(cos(arg*c), sin(arg*c));
}

void mainImage(out vec4 fragColor, in vec2 fragCoord)
{
	vec2 c = fragCoord.xy - vec2(iResolution.x*X_OFFSET, iResolution.y*Y_OFFSET);
    c /= (iResolution.y * ZOOM);
    vec2 z = c;
    float power = (sin(iGlobalTime * 0.2) + 1.) * POW_LIMIT + 1.; 
    fragColor = vec4(0., 0., 0., 0.);
    for (int i = 0; i < 256; i++){
        z = zPow(z, power) + c; //Complex squaring: z' = z^2 + c
        if (length(z) > 2.0){
        	fragColor = vec4(float(i) * CONTOUR, float(i) * 2. * CONTOUR, 1., 0.);
            break;
    	}
    }
}
