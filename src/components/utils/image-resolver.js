var availableRoles = [0,1,2,4,5,8,16,17,33,64,65,129];
export function resolveRole(id){
  switch(id){
    case(0):
    return "/assets/roles/roleimg_EM-00-00-villager.png"
    case(1):
    return "/assets/roles/roleimg_EM-01-00-vanilla.png"
    case(2):
    return "/assets/roles/roleimg_EM-02-00-doctor.png"
    case(4):
    return "/assets/roles/roleimg_EM-01-01-cop.png"
    case(5):
    return "/assets/roles/roleimg_EM-06-12-stalker.png"
    case(8):
    return "/assets/roles/roleimg_EM-01-03-bulletproof.png"
    case(16):
    return "/assets/roles/roleimg_EM-04-02-drunk.png"
    case(17):
    return "/assets/roles/roleimg_EM-03-11-hooker.png"
    case(33):
    return "/assets/roles/roleimg_EM-04-12-lawyer.png"
    case(64):
    return "/assets/roles/roleimg_EM-00-02-miller.png"
    case(65):
    return "/assets/roles/roleimg_EM-01-11-don.png"
    case(129):
    return "/assets/roles/roleimg_EM-02-11-framer.png"
  }
}
export function parseYoutubeString(url){
  const arr = url.split(/(vi\/|v%3D|v=|\/v\/|youtu\.be\/|\/embed\/)/);
  return undefined !== arr[2] ? arr[2].split(/[^\w-]/i)[0] : arr[0];
}
export function resolveRoleString(id){
  switch(id){
    case(0):
      return "Villager";
    case(1):
      return "Mafia"
    case(2):
      return "Doctor";
    case(4):
      return "Cop";
    case(5):
      return "Stalker"
    case(8):
      return "Bulletproof"
    case(16):
      return "Drunk"
    case(17):
      return "Hooker"
    case(33):
      return "Lawyer"
    case(64):
      return "Miller"
    case(65):
      return "Godfather"
    case(129):
      return "Framer"
  }
}

export function getAvailableRoles(){
  return availableRoles;
}
