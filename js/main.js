// Lets us know when the document is ready - finished loading
$(document).ready(function(){
	console.log('Document Ready....')
	
	
	// Logs the key pressed. - (e) is the event parameter
	$('#searchUser').on('keyup', function(e){
		
		console.log('Key Pressed');
		
		// Logs all keys that are pressed
		console.log(e.target.value);
		
		// Assinging variable to key thats pressed
		let username = e.target.value;
		
		// Make ajax request to GitHub
		$.ajax({
			url:'https://api.github.com/users/' + username,
			dataType: "json",
			data: {
				client_id: 'bd8d2bc63b7a6dc0cf06',
				client_secret: 'bc78a856ce6ee290d62d589aca3371b10d43aed3'
			}
		//Gives back the user object
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/' + username + '/repos',
				dataType: "json",
				data: {
				client_id: 'bd8d2bc63b7a6dc0cf06',
				client_secret: 'bc78a856ce6ee290d62d589aca3371b10d43aed3',
				// set by 5 and order by date
				sort: 'created: asc',
				per_page: 5
				}
			}).done(function(repos){
				//fetching repos from api
				console.log(repos);
				
				$.each(repos, function(index, repo){
					
					// .html will overite so we want to append
					$('#repos').append('<div class="well"><div class="row"><div class="col-md-7"><strong>'+(repo.name)+'</strong>: '+(repo.description)+'</div><div class="col-md-3"><span class="label label-default">Forks: ' +  (repo.forks_count) +'</span><span class="label label-primary">Watchers: '+(user.watchers_count)+'</span><span class="label label-success">Stars: '+(repo.stargazers_count)+'</span></div><div class="col-md-3"><a target="_blank" class="btn btn-default" href="'+(repo.html_url)+'">Repo Page</a></div></div></div>');
				});
			});
			
			// Display all information of users
			console.log(user);
			
			//Displays the users name of the object
			$('#profile').html(user.name);
			
			$('#profile').html('<div class="panel panel-default"><div class="panel-heading"><h3 class="panel-title">' + (user.name) + '</h3></div><div class="panel-body"><div class ="row"><div class="col-md-3"><img class="thumbnail avatar" src="' + (user.avatar_url) + '"><a target="_blank" class="btn btn-primary btn-block" href="' +  (user.html_url) + '">View Profile</a></div><div class="col-md-9"><span class="label label-default">Public Repos: ' +  (user.public_repos) +'</span><span class="label label-primary">Public Gists: '+(user.public_gists)+'</span><span class="label label-success">Followers: '+(user.followers)+'</span><span class="label label-info">Following: '+(user.following)+'</span><br><br><ul class="list-group"><li class="list-group-item">Company: '+(user.company)+'</li><li class="list-group-item">Website/Blog: '+(user.blog)+'</li><li class="list-group-item">Location: '+(user.location)+'</li><li class="list-group-item">Member Since: '+(user.created_at)+'</li></ul></div></div></div></div><h3 class="page-header">Latest Repos</h3><div id="repos"></div>');
		});
	});
});

