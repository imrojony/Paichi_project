
var server = 'http://127.0.0.1:8080';

function init(){
    if (localStorage.getItem('username')){
       var username = localStorage.getItem('username');
    } else {
        var username =  'Guest';
    }
    document.getElementById("navbarDropdown").innerHTML= username;
    document.getElementById("navbarDropdown").href = '/profile.html?un='+username;
    document.getElementById("myprofile").href = '/profile.html?un='+username;
}



function doLogin(event) {
    event.preventDefault();
    let Username = document.getElementById('Username').value;

    let Password = document.getElementById('Password').value;

    const myPost = {

        Username: Username,
        Password: Password
    }

    fetch(server+'/api/login', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(myPost)

    })
        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("expire", data.expire);
            // ; localStorage.getItem("token")
            // localStorage.getItem("expire");
            if (localStorage.getItem("token").length > 100) {
                localStorage.setItem("username", myPost.Username);
                document.getElementById("loginFailedMsg").innerHTML = "";
                document.getElementById("loginSuccessMsg").innerHTML = "Login Successfull... Redirecting....";
                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/"
                }, 1000)



            }


        })
        .catch(err => {
            console.log('Error message: ', err.statusTExt);

            document.getElementById("loginFailedMsg").innerHTML = "Login Failed! Please try again with correct username password";
        });

}

// registration

function doRegistration(event) {
    event.preventDefault();

    let FirstName = document.getElementById('FirstName').value;
    let LastName = document.getElementById('LastName').value;
    let Username = document.getElementById('Username').value;

    let Password = document.getElementById('Password').value;
    let Email = document.getElementById('Email').value;
    let Phone = document.getElementById('Phone').value;

    const myPost = {
        FirstName: FirstName,
        LastName: LastName,
        Username: Username,
        Password: Password,
        Phone: Phone,
        Email: Email
    }

    fetch(server+'/api/register', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify(myPost)

    })
        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {


            document.getElementById("registrationSuccessMsg").innerHTML = "Registration Successfull... Please wait redirecting to login page....";
            setTimeout(() => {
                // redirect after 1 second
                window.location = "/login.html"
            }, 3000)

        })

        // .catch(err => console.log('Error message: ', err.statusTExt));
        .catch(err => {
            console.log('Error message: ', err.statusTExt);

            document.getElementById("registrationFailedMsg").innerHTML = "Registration Failed! Please try again with different username and password";
        });
}

function logOutMe() {
    localStorage.removeItem('token');
    localStorage.removeItem('expire');
    // after remove token reload page
    setTimeout(() => {
        // redirect after 1 second
        location.reload();
    }, 1000)

}

// hksj


//jquery code

$(document).ready(function () {
    console.log(localStorage.getItem("token"))
    var token = localStorage.getItem('token');
    if (JSON.stringify(token).length > 100) {
        // Logged in code
        $('.afterlogin').css("display", "block");

        // show username in menu
        var decoded = jwt_decode(token);
        var sessionUsername = decoded.id;
        $('.showUsername').html(sessionUsername);


    } else {
        // Logged out code
        $('.beforelogin').css("display", "block");
    }
    init();
});

//profile pic change
function doProfilePictureChange(event) {
    event.preventDefault();
    const formData = new FormData()

    formData.append('Image', document.getElementById('Image').files[0])
    const myPost = {

        Image: 'placeholder.jpg',

    }

    fetch(server+'/uploader ', {

        method: 'POST',
        body: formData

    })

    .then(Response => Response.json())
    .then(profile => {
        console.log(profile);
        myPost.Image = profile.ImageName
        console.log(myPost);
        fetch(server+'/api/v1/updateprofileimage ', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")

            },
            body: JSON.stringify(myPost)
            
        })
        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {

            
            document.getElementById("profile-image").src = server+'/file/'+data.Image;
            

        })

        .catch(err => {
            console.log('Error message: ', err);
            if (err.status === 401) {
                document.getElementById("postFailedMsg").innerHTML = "Please Login first to post here .... wait redirecting to login page....";

                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/login.html"
                }, 1000)
            }

        });
    });
}
// postpage
function doPost(event) {
    event.preventDefault();
    let Location = document.getElementById('Location').value;
    let Mobile = document.getElementById('Mobile').value;
    let Description = document.getElementById('Description').value;
    let Type = document.querySelector('input[name="Type"]:checked').value

    let Image = document.getElementById('Image').files[0];
    let Title = document.getElementById('Title').value;


    const myPost = {

        Location: Location,
        Mobile: Mobile,
        Description: Description,
        Type: Type,
        Image: 'placeholder',
        Title: Title

    }
    // console.log(myPost)

    const formData = new FormData()

    formData.append('Image', document.getElementById('Image').files[0])


    fetch(server+'/uploader ', {

        method: 'POST',
        body: formData

    })

    .then(Response => Response.json())
    .then(item => {
        
        myPost.Image = item.ImageName;

        fetch(server+'/api/v1/item ', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + localStorage.getItem("token")

            },
            body: JSON.stringify(myPost)

        })

        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {

            console.log(data);
            document.getElementById("postSuccessMsg").innerHTML = "Post Successfull....";
            setTimeout(() => {
                // redirect after 1 second
                window.location = "/detail.html?id="+data.ID
            }, 2000)

        })

        .catch(err => {
            console.log('Error message: ', err);
            if (err.status === 401) {
                document.getElementById("postFailedMsg").innerHTML = "Please Login first to post here .... wait redirecting to login page....";

                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/login.html"
                }, 1000)
            }

        });


    });

return;


    
}

// lostitem

function lostItem() {
    fetch(server+'/lost-items/0')
        .then(Response => Response.json())
        .then(items => {
            console.log(items)
            let output = '<div class="row " >';
            items.forEach(function (item) {
                output += `

                 <div class="col-md-3 mt-3 mb-3">
                <div class="card card-fix-height">
                    <div class="card-block">
                        <a href="./detail.html?id=${item.ID}">
                            <img src="${server+'/file/'+item.Image}" class="img-fluid" alt="">
                        </a>
                        <div class="card-title">
                            <h3 class="text-center"> ${item.Title}</h3>
                        </div>
                        <div class="card-text text-center">
                            <p> ${item.Location}</p>
                            <p>${item.CreatedAt}</p>
                        </div>

                    </div>
                </div>
            </div>

                        `;
            });



            output += '</div>';
            document.getElementById("lost-response").innerHTML = output;

        });

}

//founditem
function foundItem() {
    fetch(server+'/found-items/0')
        .then(Response => Response.json())
        .then(items => {
            console.log(items)
            let output = '<div class="row " >';
            items.forEach(function (item) {
                output += `

                <div class="col-md-3 mt-3 mb-3">
                <div class="card card-fix-height">
                    <div class="card-block">
                        <a href="./detail.html?id=${item.ID}">
                            <img src="${server+'/file/'+item.Image}" class="img-fluid" alt="">
                        </a>
                        <div class="card-title">
                            <h3 class="text-center"> ${item.Title}</h3>
                        </div>
                        <div class="card-text text-center">
                            <p> ${item.Location}</p>
                            <p>${item.CreatedAt}</p>
                        </div>

                    </div>
                </div>
            </div>

                        `;
            });



            output += '</div>';
            document.getElementById("found-response").innerHTML = output;

        });

}
//searchItems
function searchItems() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const searchKey = encodeURI(urlParams.get('search'));

    
    fetch(server+'/search-items/0/'+searchKey)
        .then(Response => Response.json())
        .then(items => {
            console.log(items)
            let output = '<div class="row " >';
            items.forEach(function (item) {
                output += `

                <div class="col-md-3 mt-3 mb-3">
                <div class="card card-fix-height">
                    <div class="card-block">
                        <a href="./detail.html?id=${item.ID}">
                            <img src="${server+'/file/'+item.Image}" class="img-fluid" alt="">
                        </a>
                        <div class="card-title">
                            <h3 class="text-center"> ${item.Title}</h3>
                        </div>
                        <div class="card-text text-center">
                            <p> ${item.Location}</p>
                            <p>${item.CreatedAt}</p>
                        </div>

                    </div>
                </div>
            </div>

                        `;
            });



            output += '</div>';
            document.getElementById("found-response").innerHTML = output;

        });

}

// Profile-page
function profilePage() {

    fetch(server+'/api/v1/user/' + getUrlVars()["un"])
        .then(profile => profile.json())
        .then(profile => {
            console.log(profile)
            document.getElementById("pname").innerHTML = profile.Profile.FirstName+ ' '+profile.Profile.LastName ;
            document.getElementById("pemail").innerHTML = profile.Email;
            document.getElementById("uuname").innerHTML = profile.username;
            document.getElementById("profile-image").src = server+'/file/'+profile.Profile.Image;
            // document.getElementById("createdAt").innerHTML = "Date: " + item.CreatedAt;
            // document.getElementById("detail").innerHTML = item.Description;
            // document.getElementById("detail-image").src= server+'/file/'+item.Image;
            // console.log(item);

            // comments to show
            // output = '<ul class="commentList" id="comments">';
            // if (item.Comments.length > 0) {
            //     // console.log(item.Comments);
            //     item.Comments.forEach(function (comment) {
            //         output += `
            //                 <li>
            //                     <div class="commenterImage">
            //                     <img src="/assets/images/p5.jpg" class="img-fluid" alt="">
            //                     </div>
            //                     <div class="commentText">
            //                         <p><b>${comment.User.username}</b></p>
            //                         <p class="">${comment.Body}</p> <span class="date sub-text"> 
            //                         ${comment.CreatedAt}</span>

            //                     </div>
            //                 </li>

            //             `;
            //     });
            // } else {
            //     output += '<li></li>';
            // }
            // output += '</ul>';
            // document.getElementById("commentContainer").innerHTML = output;


        })
}
// detail-page
function itemdetail() {

    fetch(server+'/item/' + getUrlVars()["id"])
        .then(item => item.json())
        .then(item => {
            // console.log(item)
            document.getElementById("title").innerHTML = "Title: " + item.Title;
            document.getElementById("location").innerHTML = "Location :" + item.Location;
            document.getElementById("posted").innerHTML = "Posted by : " + item.User.username;
            document.getElementById("createdAt").innerHTML = "Date: " + item.CreatedAt;
            document.getElementById("detail").innerHTML = item.Description;
            document.getElementById("detail-image").src= server+'/file/'+item.Image;
            // console.log(item);

            // comments to show
            output = '<ul class="commentList" id="comments">';
            if (item.Comments.length > 0) {
                // console.log(item.Comments);
                item.Comments.forEach(function (comment) {
                    output += `
                            <li>
                                <div class="commenterImage">
                                <img src="/assets/images/p5.jpg" class="img-fluid" alt="">
                                </div>
                                <div class="commentText">
                                    <p><b>${comment.User.username}</b></p>
                                    <p class="">${comment.Body}</p> <span class="date sub-text"> 
                                    ${comment.CreatedAt}</span>

                                </div>
                            </li>

                        `;
                });
            } else {
                output += '<li></li>';
            }
            output += '</ul>';
            document.getElementById("commentContainer").innerHTML = output;


        })
}
//get  url parameter value
function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}


// Comment
function doComment(event) {
    event.preventDefault();
    let Body = document.getElementById('CommentBody').value;

    const myComment = {

        Body: Body,
        ItemID: getUrlVars()["id"]

    }
    console.log(myComment)


    fetch(server+'/api/v1/post/' + getUrlVars()["id"] + '/comment', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")

        },
        body: JSON.stringify(myComment)

    })

        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {


            document.getElementById("commentSuccessMsg").innerHTML = "Post Successfull....";
            setTimeout(() => {
                // redirect after 1 second
                location.reload();
            }, 1000)
            // var li = document.createElement("LI");
            // let comment = `

            //                     <div class="commenterImage">
            //                         <img src="http://placekitten.com/40/40" />
            //                     </div>
            //                     <div class="commentText">
            //                         <p class="">${data.Body}</p> <span class="date sub-text">${data.CreatedAt}</span>

            //                     </div>
            // `;

            // li.innerHTML = comment;
            // document.getElementById("comments").appendChild(li);

        })

        .catch(err => {
            console.log('Error message: ', err);
            location.reload();
            if (err.status === 401) {
                document.getElementById("commentFailedMsg").innerHTML = "Please Login first to post here .... wait redirecting to login page....";

                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/login.html"
                }, 1000)
            }

        });
}
// contact



function doContact(event) {
    event.preventDefault();
    let FirstName = document.getElementById('FirstName').value;

    let lastName = document.getElementById('LastName').value;
    let Subject = document.getElementById('Subject').value;
    let Description = document.getElementById('Description').value;

    const myPost = {
        FirstName: FirstName,

        LastName: LastName,
        Subject: Subject,
        Description: Description

    }

    fetch(server+'/api/v1/contact ', {

        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            "Authorization": "Bearer " + localStorage.getItem("token")


        },
        body: JSON.stringify(myPost)

    })


        .then((res) => {
            if (res.ok) {
                return res.json()

            } else {
                return Promise.reject({ status: res.status, statusText: res.statusText });
            }
        })

        .then((data) => {


            document.getElementById("SubmitSuccessMsg").innerHTML = "Submit Successfull....";
            // setTimeout(() => {
            //     // redirect after 1 second
            //     window.location = "/login.html"
            // }, 3000)

        })




        .catch(err => {
            console.log('Error message: ', err);
            if (err.status === 401) {
                document.getElementById("submitFailedMsg").innerHTML = "Please Login first to contact here .... wait redirecting to login page....";

                setTimeout(() => {
                    // redirect after 1 second
                    window.location = "/login.html"
                }, 2000)
            }

        });


}

