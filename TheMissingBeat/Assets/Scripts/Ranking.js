#pragma strict

private var finish : boolean = false;
               
function Rankea(myName : String, finishTime : float) {
	var i : int = 0;
	var j : int = 10;
	var time : float = finishTime;
	var name : String = myName;
	while(i < 10) {
		var otherTime : float = PlayerPrefs.GetFloat(i.ToString(), -1);
		Debug.Log(otherTime);
		if(otherTime < 0 || time < otherTime) {
			var auxName :  String = PlayerPrefs.GetString(j.ToString(), "Agapito");
			PlayerPrefs.SetFloat(i.ToString(),time);
			PlayerPrefs.SetString(j.ToString(),name);
			time = otherTime;
			name = auxName;
		}
		++i;
		++j;
	}
}

function OnGUI() {
	if(finish) {
		var i : int = 0;
		var j : int = 10;
		var k : int = 1;

		while(i < 10) {
			var name : String = PlayerPrefs.GetString(j.ToString(), "Agapito");
			var time : float = PlayerPrefs.GetFloat(i.ToString(), -1);
			var texto : String = k+". " + name + " " + time.ToString("F3");
			GUI.Label(Rect(10,90+k*30,200,20), texto);
			++i;
			++j;
			++k;
		}
		
		/*
		var sr = new StreamReader(path);
	    var fileContents = sr.ReadToEnd();
	    sr.Close();
	    var lines = fileContents.Split("\n"[0]);
	    var i : int = 1;
	    for (line in lines) {
	    	var punt = line.Split(":"[0]);
	    	var nombre : String = i+". ";
	    	for(p in punt)	{
	    		nombre = nombre + p + " ";
	    	}
	    	GUI.Label(Rect(10,90+i*30,200,20), nombre);
	    	++i;
	    }
	    */
	}
}

function Finish() {
	finish = true;
}
