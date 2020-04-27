<template>
    <div class="container">
        
          <div class="col-md-12 mt-3">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">User List</h3>

                <div class="card-tools">
                 <button class="btn btn-success" @click="openModal">Add New User  <i class="fa fa-user-plus fa-fw"></i></button>
                </div>
              </div>
              <!-- /.card-header -->
              <div class="card-body table-responsive p-0">
                <table class="table table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Type</th>
                      <th>Registered</th>
                      <th>Modify</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user,index) in users" :key="user.id">
                      <td>{{index + 1}}</td>
                      <td>{{user.name}}</td>
                      <td>{{user.email}}</td>
                      <td>{{user.type|capitalize}}</td>
                      <td>{{user.created_at |myDate}}</td>
                      <td>
                          <a href="" @click.prevent="editModal(user)">
                              <i class="fa fa-edit"></i>
                          </a>
                          <a href="" @click.prevent="deleteuser(user.id)">
                              <i class="fa fa-trash red"></i>
                          </a>
                     </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- /.card-body -->
            </div>
            <!-- /.card -->
          </div>
        <!-- modal -->
        <div class="modal fade" id="userModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">{{editMode? "Update":"New"}} User</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <form @submit.prevent="editMode? updateuser() :createuser()" @keydown="form.onKeydown($event)">
                <div class="modal-body">
                <div class="form-group">
                    <input v-model="form.name" type="text" name="name" placeholder="Enter Name"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('name') }">
                    <has-error :form="form" field="name"></has-error>
                </div>
                <div class="form-group">
                    <input v-model="form.email" type="email" name="email" placeholder="Enter Email"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('email') }">
                    <has-error :form="form" field="email"></has-error>
                </div>
                <div class="form-group">
                    <textarea v-model="form.bio" name="bio" placeholder="Enter Bio"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('bio') }"></textarea>
                    <has-error :form="form" field="bio"></has-error>
                </div>
                <div class="form-group">
                    <select v-model="form.type" name="type" placeholder="Enter type"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('type') }">
                      <option value="">Select User Role</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="author">Author</option>
                      </select>
                    <has-error :form="form" field="type"></has-error>
                </div>
                <div class="form-group">
                    <input v-model="form.password" type="password" name="password" placeholder="Enter password"
                      class="form-control" :class="{ 'is-invalid': form.errors.has('password') }">
                    <has-error :form="form" field="password"></has-error>
                </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">{{editMode?"Update":"Create"}}</button>
                </div>
                </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
      data(){
        return{
          editMode:false,
          users:{},
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
        methods: {
            openModal(){
              this.editMode = false;
              this.form.reset();
              this.form.clear();
                $('#userModal').modal('show');
            },
             editModal(user){
               this.editMode = true;
              this.form.reset();
              this.form.clear();
                $('#userModal').modal('show');
                this.form.fill(user);
            },
            loadusers(){
              this.$Progress.start()
              axios.get('api/user').then(({data})=>(this.users = data.data,
                      this.$Progress.finish()
              ))
              .catch((e)=>{
                console.log(e);
                this.$Progress.fail()
              })
            },
            createuser(){
              this.$Progress.start()
                this.form.post('api/user')
                .then(()=>{
                  $('#userModal').modal('hide');
                  Fire.$emit('refresh');
                  Toast.fire({
                    icon: 'success',
                    title: 'User Created in successfully'
                })
                  this.$Progress.finish()
                })
                .catch(()=>{
                  this.$Progress.fail()
                })
            },
            
            updateuser(){
              this.$Progress.start()
              this.form.put('api/user/'+ this.form.id)
              .then(()=>{
                $('#userModal').modal('hide');
                  Fire.$emit('refresh');
                  Toast.fire({
                    icon: 'success',
                    title: 'User Updated in successfully'
                })
                this.$Progress.finish()
              })
              .catch(()=>{
                this.$Progress.fail()
              })
            },
            deleteuser(id){
              Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
              }).then((result) => {
              if (result.value) {
                axios.delete('api/user/'+ id)
                  .then(()=>{
                     
                    Fire.$emit('refresh');
                    Toast.fire({
                        icon: 'success',
                        title: 'User Deleted in successfully'
                    })
                  })
                  .catch(()=>{
                    Swal.fire({
                      title: 'Error!',
                      text: 'Do you want to continue',
                      icon: 'error',
                      confirmButtonText: 'Cool'
                    })
                  })
               
                   }
              })
            }
        },
        created() {
          this.loadusers();
          // setInterval(()=> this.loadusers(), 3000);
          Fire.$on('refresh',()=>{
            this.loadusers();
          })
        }
    }
</script>
