var availableRoles = [0,1,2,4,5,8,16,17];
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
  }
}


export function getAvailableRoles(){
  return availableRoles;
}
