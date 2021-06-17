enum HttpStatus {
  INTERNAL_SERVER_ERROR = 500,
  CREATED = 201,
  OK = 200,
  BAD_REQUEST = 400
}

// Example user type
interface User {
  name: string;
  email: string;
  dob: Date;
}

// Example request body model
interface RequestModel {
  id: string;
  username: string;
  createdAt: Date;
}

const AUTH_URL = 'https://url.to.auth.system.com/invitation';
const INVALID_BODY_ERROR = `Invalid invitation request with error ${HttpStatus.BAD_REQUEST}`;
const EXISTING_USER_ERROR = 'User already invited to this shop';
const REQUEST_FAILED_ERROR = `Unable to complete invite request with error ${HttpStatus.INTERNAL_SERVER_ERROR}`;
const SHOP_NOT_FOUND =
  'The requested shop does not exist, please ensure you entered a valid shop id';

export const inviteUser = (req: Request, res: Response) => {
  const invitationBody = req.body;
  const shopId = req.params.shopId;

  if (!invitationBody) {
    return res.status(HttpStatus.BAD_REQUEST).send(INVALID_BODY_ERROR);
  }

  superAgent
    .post(AUTH_URL)
    .send(invitationBody)
    .set('accept', 'json')
    .end(async (error, res) => {
      switch (res.status) {
        case HttpStatus.CREATED:
          const newUser = await createUser(invitationBody, res);
          findShop(shopId, newUser, invitationBody);
          break;
        case HttpStatus.OK:
          return res.status(HttpStatus.BAD_REQUEST).json({
            error: true,
            message: EXISTING_USER_ERROR
          });
        default:
          return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            message: REQUEST_FAILED_ERROR
          });
      }
      return res.json();
    });
};

const createUser = async (
  body: RequestModel,
  response: Response
): Promise<User> => {
  return await User.findOneAndUpdate(
    {
      authId: response.body.authId
    },
    {
      authId: response.body.authId,
      email: body.email
    },
    {
      upsert: true,
      new: true
    }
  );
};

const findShop = (shopId: string, user: User, body: RequestModel) => {
  Shop.findById(shopId, (error, shop) => {
    const isExistingUser = shop.users.includes(user._id);
    const isExistingInvitation = shop.invitations.includes(body.invitationId);

    if (isExistingInvitation && shop) {
      shop.invitations.push(body.invitationId);
      if (isExistingUser) {
        shop.users.push(user);
      }
      shop.save();
    } else if (error || !shop) {
      return new Response().status(HttpStatus.INTERNAL_SERVER_ERROR).send({
        message: error
          ? SHOP_NOT_FOUND + `with error: ${error}`
          : SHOP_NOT_FOUND
      });
    }
  });
};
