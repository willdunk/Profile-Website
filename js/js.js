//Returns false if nav is folded in, true if nav is out
function navOut()
{
	return !($("#nav-wrapper").css("width")=="50px");
}

function navClick()
{
	$("#nav-button").click(function()
	{
		if(navOut())
		{
			//return to normal
			$(this).attr("src", "../images/icons/list.png")
			$("#nav-wrapper").animate
			(
				{width:"50px"}
			);

			shrink();
			
			$(".nav-item").toggleClass("nav-item-extended");
		}
		else
		{
			//extend out
			$(this).attr("src", "../images/icons/arrow_left.png")
			$("#nav-wrapper").animate
			(
				{width:"15%"}
			);

			spread();
						
			$(".nav-item").toggleClass("nav-item-extended");
		}
	});
}

function spread()
{
  $("#content-wrapper").animate
  ({
    marginLeft: ($(document).width() * .15)-50
  });

  $("#shadowbox").fadeTo(400,.5);
}

function shrink()
{
  $("#content-wrapper").animate
  ({
    marginLeft:0
  });
  
  $("#shadowbox").fadeOut(400);
}

var profileApp = angular.module('profileApp', []);

profileApp.controller("PhotographyController", ['$scope', '$http', '$sce', 
function($scope, $http, $sce)
{
	$scope.photolist = {data:null};
	$scope.photo = {data:null};
	$scope.buildPhotoList = function()
	{
		$http.get("http://api.williamdunkerley.com/photography/featured")
		.success(function(data)
		{
			$scope.photolist.data = [];
			for (var i = 0; i < data.length; i++)
			{
				//cycle through all album ids
				$scope.photolist.data.push(data[i]);
			}
			// $scope.$apply();
		})
		.error(function(data)
		{
			console.log(error);
		});
	}

	$scope.activatePhotoWindow = function(_index, _photolist)
	{
		$("#shadowbox").fadeTo(400, .90);
		$("#photo-window").css("visibility", "visible");
		$("#photo-window").fadeTo(400, 1);
		$scope.photo.data = _photolist[_index].filepath;
	}

	$scope.deactivatePhotoWindow = function()
	{
		$("#shadowbox").fadeOut(400);
		$("#photo-window").fadeOut(400, function()
		{
			$("#photo-window").css("visibility", "visible");
		});
		$scope.photo.data = "http://localhost/images/loading.svg";
	}

	$scope.trustUrl = function(_url)
	{
		return $sce.trustAsResourceUrl(_url);
	}
}]);



$(document).ready(function()
{
	navClick();
});