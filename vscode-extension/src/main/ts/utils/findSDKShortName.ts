/*
Copyright 2016-2017 Bowler Hat LLC

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

	http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import findSDKName from "./findSDKName";

const AIR = "AIR ";
const FLEX = "Flex ";
const FLEXJS = "FlexJS ";
const FEATHERS = "Feathers SDK ";
const APACHE_FLEX = "Apache Flex ";
const APACHE_FLEXJS = "Apache Flex (FlexJS) ";
const FP = " FP";

function stripAfterNextSpace(sdkName: string, prefix: string, replacementPrefix?: String): string
{
	let index = sdkName.indexOf(" ", prefix.length);
	if(index !== -1)
	{
		//stop after the version number
		if(replacementPrefix)
		{
			return replacementPrefix + sdkName.substr(prefix.length, index - prefix.length);
		}
		return sdkName.substr(0, index);
	}
	return sdkName;
}

export default function findSDKShortName(sdkPath: string): string
{
	let sdkName = findSDKName(sdkPath);
	if(sdkName === null)
	{
		return null;
	}
	if(sdkName.startsWith(AIR) || sdkName.startsWith(FLEX))
	{
		//it's already short enough
		return sdkName;
	}
	if(sdkName.startsWith(FEATHERS))
	{
		return stripAfterNextSpace(sdkName, FEATHERS);
	}
	if(sdkName.startsWith(APACHE_FLEXJS))
	{
		return stripAfterNextSpace(sdkName, APACHE_FLEXJS, FLEXJS);
	}
	if(sdkName.startsWith(APACHE_FLEX))
	{
		return stripAfterNextSpace(sdkName, APACHE_FLEX);
	}
	//we don't know what type of SDK this is, but if it lists Flash Player and
	//AIR versions after the main name, we will strip those away
	let index = sdkName.indexOf(FP);
	if(index !== -1)
	{
		return sdkName.substr(0, index);
	}
	return sdkName;
}