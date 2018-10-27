<template>
  <div>
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
              <img :src="person._avatar">
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
                          <v-text-field label="Nombre" required></v-text-field>
                        </v-flex>
                        <v-flex xs12 sm6 md6>
                          <v-text-field label="URL de imagen" required></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green darken-1" flat @click.native="dialog1 = false">No</v-btn>
                    <v-btn color="green darken-1" flat @click.native="dialog1 = false">Si</v-btn>
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
                    <v-btn color="green darken-1" flat @click.native="dialog2 = false">No</v-btn>
                    <v-btn color="green darken-1" flat @click.native="dialog2 = false">Si</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </v-card>
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
      persons: [
        {
          _id: '1',
          _name: 'chris',
          _avatar: 'https://randomuser.me/api/portraits/men/77.jpg'
        },
        {
          _id: '2',
          _name: 'ricardo',
          _avatar: 'https://randomuser.me/api/portraits/men/90.jpg'
        },
        {
          _id: '3',
          _name: 'ana',
          _avatar: 'https://randomuser.me/api/portraits/women/40.jpg'
        }
      ]
    }
  },
  methods: {
    async getPersons () {
      this.persons = (await LandingService.index()).data
    },
    async deletePerson () {
      this.persons = (await LandingService.index()).data
    },
    async updatePerson () {
      this.persons = (await LandingService.index()).data
    }
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
</style>
