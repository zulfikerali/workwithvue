<style>
    .widget-user-header{
        background-position: center center;
        background-size: cover;
        height: 250px;
    }
</style>
<template>
    <div class="container">
        <div class="row ">
            <div class="col-md-12 mt-3">
             
            <!-- Widget: user widget style 1 -->
                        <div class="card card-widget widget-user">
                        <!-- Add the bg color to the header using any of the bg-* classes -->
                        <div class="widget-user-header text-white" style="background: url('./img/photo2.png') center center;">
                        <h3 class="widget-user-username text-right">Elizabeth Pierce</h3>
                        <h5 class="widget-user-desc text-right">Web Designer</h5>
                        </div>
                        <div class="widget-user-image">
                        <img class="img-circle" src="" alt="User Avatar">
                        </div>
                        <div class="card-footer">
                        <div class="row">
                            <div class="col-sm-4 border-right">
                            <div class="description-block">
                                <h5 class="description-header">3,200</h5>
                                <span class="description-text">SALES</span>
                            </div>
                            <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4 border-right">
                            <div class="description-block">
                                <h5 class="description-header">13,000</h5>
                                <span class="description-text">FOLLOWERS</span>
                            </div>
                            <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                            <div class="col-sm-4">
                            <div class="description-block">
                                <h5 class="description-header">35</h5>
                                <span class="description-text">PRODUCTS</span>
                            </div>
                            <!-- /.description-block -->
                            </div>
                            <!-- /.col -->
                        </div>
                        <!-- /.row -->
                        </div>

                    </div><!-- /.card-body -->
                </div>
            </div>
            <!-- /.widget-user -->
            <div class="card">
              <div class="card-header p-2">
                <ul class="nav nav-pills">
                  <li class="nav-item"><a class="nav-link" href="#activity" data-toggle="tab">Activity</a></li>
                  <li class="nav-item"><a class="nav-link active" href="#settings" data-toggle="tab">Settings</a></li>
                </ul>
              </div><!-- /.card-header -->
              <div class="card-body">
                <div class="tab-content">
                  <div class="tab-pane" id="activity">
                    <!-- Post -->
                    <div class="post">
                      <div class="user-block">
                        
                        <h3 class="text-center">User Ativities !!</h3>
                      </div>
                      <!-- /.user-block -->
                    </div>
                    <!-- /.post -->
                  </div>
                  <!-- /.tab-pane -->
                  
                  <!-- /.tab-pane -->

                  <div class="tab-pane active" id="settings">
                    <form class="form-horizontal">
                      <div class="form-group row">
                        <label for="inputName" class="col-sm-2 col-form-label">Name</label>
                        <div class="col-sm-10">
                          <input type="email" v-model="form.name" class="form-control" id="inputName" placeholder="Name">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputEmail" class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10">
                          <input type="email" v-model="form.email" class="form-control" id="inputEmail" placeholder="Email">
                        </div>
                      </div>
                      <div class="form-group row">
                        <label for="inputExperience" class="col-sm-2 col-form-label">Experience</label>
                        <div class="col-sm-10">
                          <textarea class="form-control" id="inputExperience" placeholder="Experience"></textarea>
                        </div>
                      </div>
                      
                      <div class="form-group row">
                          <label for="photo" class="col-sm-2 col-form-label">Photo</label>
                          <div class="col-sm-10">
                          <input type="file"  @change="updateprofile" class="form-control" name="photo">
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputSkills" class="col-sm-2 col-form-label">Skills</label>
                        <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputSkills" placeholder="Skills">
                        </div>
                      </div>
                      <!-- <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <div class="checkbox">
                            <label>
                              <input type="checkbox"> I agree to the <a href="#">terms and conditions</a>
                            </label>
                          </div>
                        </div>
                      </div> -->
                      <div class="form-group row">
                        <div class="offset-sm-2 col-sm-10">
                          <button type="submit" @click.prevent ="updateInfo" class="btn btn-danger">Update</button>
                        </div>
                      </div>
                    </form>
                  </div>
                  <!-- /.tab-pane -->
                </div>
                <!-- /.tab-content -->
              </div><!-- /.card-body -->
            </div>
            <!-- /.nav-tabs-custom -->
          </div>
        
</template>

<script>
    export default {
        data(){
            return {
                form:new Form({
                id:'',
                name:'',
                email:'',
                password:'',
                type:'',
                bio:'',
                photo:'',
                })
            }
        },
        mounted() {
            console.log('Component mounted.')
        },
        methods:{
          updateInfo(){
            this.form.put('api/profile')
            .then(()=>{
              
            })
            .catch(()=>{

            })
          },

          updateprofile(element){
              let file = element.target.files[0];
              console.log(file);
              let reader = new FileReader();
              reader.onloadend = (file)=> {
                // console.log('RESULT', reader.result)
                this.form.photo = reader.result;
              }
              reader.readAsDataURL(file);
              }
        },
        created(){
            axios.get('api/profile')
            .then(({data})=>(this.form.fill(data)))
            .catch((e)=>{
                console.log(e);
            })
        }
    }
</script>
