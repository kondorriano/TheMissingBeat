public enum EaseType
{
	EaseInQuad = 0,
	EaseOutQuad,    
	EaseInOutQuad,  
	EaseInCubic,    
	EaseOutCubic,   
	EaseInOutCubic, 
	EaseInQuart,    
	EaseOutQuart,   
	EaseInOutQuart, 
	EaseInQuint,    
	EaseOutQuint,   
	EaseInOutQuint, 
	EaseInSine,     
	EaseOutSine,    
	EaseInOutSine,  
	EaseInExpo,     
	EaseOutExpo,    
	EaseInOutExpo,  
	EaseInCirc,     
	EaseOutCirc,    
	EaseInOutCirc,  
	Linear,         
	Spring,         
	EaseInBounce,   
	EaseOutBounce,  
	EaseInOutBounce,
	EaseInBack,     
	EaseOutBack,    
	EaseInOutBack,  
	EaseInElastic,  
	EaseOutElastic, 
	EaseInOutElastic
}

public static class iTweenX
{	
	public readonly static string[] easeTypes = new string[32]
	{
		"easeInQuad",
		"easeOutQuad",
		"easeInOutQuad",
		"easeInCubic",
		"easeOutCubic",
		"easeInOutCubic",
		"easeInQuart",
		"easeOutQuart",
		"easeInOutQuart",
		"easeInQuint",
		"easeOutQuint",
		"easeInOutQuint",
		"easeInSine",
		"easeOutSine",
		"easeInOutSine",
		"easeInExpo",
		"easeOutExpo",
		"easeInOutExpo",
		"easeInCirc",
		"easeOutCirc",
		"easeInOutCirc",
		"linear",
		"spring",
		"easeInBounce",
		"easeOutBounce",
		"easeInOutBounce",
		"easeInBack",
		"easeOutBack",
		"easeInOutBack",
		"easeInElastic",
		"easeOutElastic",
		"easeInOutElastic"
	};
	
	public const string time =		"time";
	public const string speed =		"speed";
	public const string from =		"from";
	public const string to =		"to";
	public const string onStart =          	"onstart";
	public const string onStartTarget =	"onstarttarget";
	public const string onStartParams =	"onstartparams";
	public const string onUpdate =		"onupdate";
	public const string onUpdateTarget =	"onupdatetarget";
	public const string onUpdateParams =	"onupdateparams";
	public const string onComplete =	"oncomplete";
	public const string onCompleteTarget =	"oncompletetarget";
	public const string onCompleteParams =	"oncompleteparams";
	public const string ignoreTimescale =	"ignoretimescale";
	public const string easeType =		"easetype";
	
	public static string Ease( EaseType type )
	{
		return easeTypes[ (int)type ];
	}
}