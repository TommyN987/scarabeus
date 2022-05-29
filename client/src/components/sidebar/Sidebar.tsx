import { Typography, Drawer } from "@mui/material";
import scarab from '../../assets/images/scarab-logo.png';


const Sidebar = () => {


  return (
    <>
      <Drawer
        variant='permanent'
        anchor="left"
      >
        <div className='brand'>
          <img className='logo' src={scarab} alt="" />
          <div>
            <Typography
              variant="h4"
              fontFamily='Cairo'
              fontWeight={800}
            >
            SCARABEUS
            </Typography>
            <Typography
              variant="h6"
              fontFamily='Cairo'
              fontWeight={600}
              sx={{
                marginTop: '-1rem'
              }}
            >
            bug tracker
            </Typography>
          </div>
        </div>
      </Drawer>
    </>
  )
}
export default Sidebar