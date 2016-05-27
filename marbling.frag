//https://www.shadertoy.com/view/MdySzR

vec2 pa(in vec2 uv, in float per){
    vec2 result = (sin(uv.x*per)) * normalize(vec2(cos((uv.x)*per), .5));
    return result;
}

vec2 pb(in vec2 uv, in float per){
    vec2 result = (cos(uv.y*per)) * normalize(vec2(1., cos((uv.y)*per)));
    return result;
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    float t = iGlobalTime/4.;
    
	vec2 uv = -1. + 2.*(fragCoord.xy / iResolution.xy);
    uv.x *= iResolution.x/iResolution.y*.5+.5;
        
    vec2 vpert = pa(uv, 20.);
    uv += vpert * sin(t) *.2;
    
    vec2 hpert = pb(uv, 51.);
     uv += hpert * sin(t) * .08;
    
    vec4 col = texture2D(iChannel0, uv);
	fragColor = fragColor = mix(vec4(sin(uv.y*2.), 0., cos(uv.y*3.), 1.), col, .9);
}
