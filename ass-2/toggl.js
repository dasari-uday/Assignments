
            function reg(){
                let r=document.getElementsByClassName("email1");
                let s=document.getElementsByClassName("email2");
                r[0].style.display="block";
                s[0].style.display="none";
            };
            function sig(){
                let r=document.getElementsByClassName("email1");
                let s=document.getElementsByClassName("email2");
                r[0].style.display="none";
                s[0].style.display="block";
            }
            function store(){
                        const name = document.getElementById("name").value;
                        const lastname = document.getElementById("lastname").value;
                        const  email= document.getElementById("email").value;
                        const password = document.getElementById("password").value;
                        sessionStorage.setItem("name", name);
                        sessionStorage.setItem("lastname", lastname);
                        sessionStorage.setItem("email", email);
                        sessionStorage.setItem("password", password);
            }
        