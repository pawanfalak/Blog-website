(function(){
    const app = angular.module("BlogApp", []);
    app.controller("BlogController", BlogController);
            function BlogController($scope,$http){
            $scope.createPost = createPost;
            $scope.deletePost = deletePost;
            function init() {
                getAllPosts();
            }
            init();
            function getAllPosts() {
                $http
                    .get("/api/blogpost")
                    .success(function(posts){
                        $scope.posts=posts;
                    })
            }
            function deletePost (postID){
                    $http
                        .delete("/api/blogpost/"+postID)
                        .success(getAllPosts);
            }
            function createPost (post){
                console.log(post);
                $http
                    .post("/api/blogpost",post)
                    .success(getAllPosts);
            }
        }
})();