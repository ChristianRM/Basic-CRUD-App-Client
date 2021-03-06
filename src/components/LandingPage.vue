<template>
  <div class="centered">
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-toolbar color="indigo" dark>
          <v-toolbar-title>Simple CRUD App</v-toolbar-title>
        </v-toolbar>
        <v-list>
          <v-list-tile
            v-for="person in persons"
            :key="person._id"
            avatar
          >
            <v-list-tile-content>
              <v-list-tile-title v-text="person._name"></v-list-tile-title>
            </v-list-tile-content>
            <v-list-tile-avatar>
              <img v-if="person._avatar" :src="person._avatar">
              <img v-else :src="'https://c-sf.smule.com/z0/account/icon/v4_defpic_256.png'">
            </v-list-tile-avatar>
            <v-list-tile-action>
              <v-dialog v-model="dialog1" persistent max-width="500" offset-sm1>
                <v-btn slot="activator" color="blue" flat icon><v-icon>edit</v-icon></v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">User Profile</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6>
                          <v-text-field v-model="newName" label="Nuevo Nombre" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field v-model="newURL" label="Nueva URL de imagen" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="resetDialogs">No</v-btn>
                    <v-btn color="green darken-1" flat @click.native="updatePerson(person)">Si</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-action>
            <v-list-tile-action>
              <v-dialog v-model="dialog2" persistent max-width="290">
                <v-btn slot="activator" color="pink" flat icon><v-icon>delete</v-icon></v-btn>
                <v-card>
                  <v-card-text>Deseas eliminar a esta persona de tu lista?.</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="resetDialogs">No</v-btn>
                    <v-btn color="green darken-1" flat @click.native="deletePerson(person)">Si</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
      <v-dialog v-model="dialog3" persistent max-width="500" offset-sm1>
                <v-btn slot="activator" color="green" flat icon><v-icon>plus_one</v-icon></v-btn>
                <v-card>
                  <v-card-title>
                    <span class="headline">Nueva persona</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 sm6 md6>
                          <v-text-field v-model="newName" label="Nuevo Nombre" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field v-model="newURL" label="Nueva URL de imagen" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="resetDialogs">No</v-btn>
                    <v-btn color="green darken-1" flat @click.native="postPerson()">Si</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
    </v-flex>
  </v-layout>
  </div>
</template>

<script>
import LandingService from '@/services/LandingService'
import Person from './Person'
export default {
  name: 'HelloWorld',
  components: {
    Person
  },
  data () {
    return {
      dialog1: false,
      dialog2: false,
      dialog3: false,
      newName: '',
      newURL: '',
      persons: [
      ]
    }
  },
  methods: {
    async getPersons () {
      try {
        this.persons = (await LandingService.index()).data
      } catch (error) {
        console.log(error)
      }
    },
    async deletePerson (item) {
      try {
        this.resetDialogs()
        console.log(item)
        await LandingService.delete(item._id)
        this.getPersons()
      } catch (error) {
        console.log(error)
      }
    },
    async postPerson () {
      try {
        let item = {_name: this.newName, _avatar: this.newURL}
        this.resetDialogs()
        await LandingService.post(item)
        this.getPersons()
      } catch (error) {
        console.log(error)
      }
    },
    async updatePerson (item) {
      try {
        console.log(item)
        item._name = this.newName
        item._avatar = this.newURL
        this.resetDialogs()
        await LandingService.put(item)
        this.getPersons()
      } catch (error) {
        console.log(error)
      }
    },
    resetDialogs () {
      this.dialog1 = false
      this.dialog2 = false
      this.dialog3 = false
      this.newName = ''
      this.newURL = ''
    }
  },
  mounted () {
    this.getPersons()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.centered {
  margin: auto;
  padding-left: 30%;
  width: 100%;
}
</style>
