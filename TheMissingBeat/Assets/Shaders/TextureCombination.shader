Shader "Custom/TextureCombination" {
	Properties {
		_MainTex ("Base (RGB)", 2D) = "white" {}
		//_SecondTex ("Second (RGB)", 2D) = "white" {}
		//_Color ("Dark Color", Color) = (0.5,0.5,0.5,1.0)

	}
	SubShader {
		Tags { "Queue" = "Geometry" }
		
		Pass {
		CGPROGRAM
// Upgrade NOTE: excluded shader from DX11 and Xbox360; has structs without semantics (struct v2f members uv_MainTex,uv_SecondTex)
		#pragma exclude_renderers ps3 xbox360 d3d11
		#pragma vertex vert
		#pragma fragment frag
		#include "UnityCG.cginc"
		
		uniform sampler2D _MainTex;
		uniform float4 _MainTex_ST;
		uniform float counter;
		//uniform fixed4 _Color;

		//uniform sampler2D _SecondTex;
		//uniform float4 _SecondTex_ST;

		
		uniform float radius;
		uniform float4 position;
		
		struct appdata {
    		float4 vertex : POSITION;
    		float4 texcoord : TEXCOORD0;
    		//float4 texcoord1 : TEXCOORD1;

		};

		
		struct v2f {
			float4 pos : SV_POSITION;
    		half2 uv : TEXCOORD0;	
    		//half2 uv2 : TEXCOORD1;	
    		float3 wpos : TEXCOORD2;
		};
		
		v2f vert (appdata v)
		{
			v2f o;
			o.pos = mul (UNITY_MATRIX_MVP, v.vertex);
			o.uv = TRANSFORM_TEX(v.texcoord, _MainTex);
			//o.uv2 = TRANSFORM_TEX(v.texcoord1, _SecondTex);
			o.wpos = mul (_Object2World, v.vertex).xyz;
			return o;
		}
		
		fixed4 frag (v2f i) : COLOR0 { 		
		
			half4 c = tex2D (_MainTex, i.uv);
			half4 darkColor = half4(0.1,0.1,0.1,1.1);
			if(length(i.wpos-position.xyz) <= radius) {
				c = tex2D (_MainTex, i.uv);

			} else {
				c = darkColor*tex2D (_MainTex, i.uv);
			}
			
			return c;
			
		}
		ENDCG
		}
	} 
FallBack "Diffuse"
}