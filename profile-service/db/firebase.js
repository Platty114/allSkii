const serviceAccount = {
    "type": "service_account",
    "project_id": "allskii-ecd4d",
    "private_key_id": "7efc3136c5c164de82c3e91f630bfc5931d684dd",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCxASVyJTXQMaeB\nVanGbo8FcGKQTMtwYq6v0PTBgjFmTzxwYsudEAG1z5eIq+OzInoP1Ws+2Ex9QMHH\nluFzC9bFjSwUvYFG5X2781aPqMwJ3Yxxqzkq+JeA+V7d0c7EXoTbOVzCXnCCzOHA\nnSpVyMRP2KbG8zgm8nw9hE+khSYjeUJll+wj6wn6KPgDmLr0gYB5YmgIIlpBT54S\nmuWYcMZL2+gIfIKLuPaGnr4/HS5p41of8zZC8as/ks3dSg+du8ZZ8jGb9TLtV9CB\nScv5bL6houXw06mcISpzty1zKur8mhj1lkrvIYYBU2pmLcKhaG2lfUcN7MG5dgv5\n50NewualAgMBAAECggEADVcHLQsdrlf2EwrgHx+SxKSSFeRm9xlfQP2zWvVZwI3I\nNRzwOFSBTH23Ir3E2dAg+U1RJkAqKgAJARnSwL24egfU6Q5yZ8pAwTsdrJLajdCW\nSeecCPkJsgnmDggTi6LAyiTdZAJQe6S+5UO/2EDa5FZxSB02GV+9E7kDdGRa83rx\ngxg5/CTgB2N2RcJqH26Sr1Z8u3Ue/4e2Ssqfz19j4Cx0IBvlRvXolc4XSFXvXeUS\nciZWAn228whbh31TKhfJgTMhvMZ3ZIqDbRgoyuRbbZyTFK9xnFpqMgjuoXp0RfcF\nbko/eZ3iahcvyvpnaPJCsz2b/P1CvI9gTc2tlt1tIQKBgQDjUmqtgQ4tvqURtkCg\nYQe7Ipo6uRr59QJ8LoafaSarVmm1vrn//PJ/obPvtG57eEJHvsE6lpwzi80siTR9\nTagIC/p7DBEarYs/rL49tJpIxWXprdSh2j42GBiHkuIGB3sBJ4bwHbqUKrteRBH9\no63hCqi8+ZGbhjTGDiggPGIICwKBgQDHVa2adc8LMqB3HWA8pZnWXVr/g6zbXxwm\n0d7Q/H7tnppcGKpDtz678muUaFQS3ADrXFhJqnt1AoHJTtDE7ecbdwaSKUxJGqGc\nS3HKpf7/QOnFtmJ3g5CEF0pbsjQHrssTjJAs7JLaiWM1EhKGCmnA+q3vSIlFiSRp\nJVITjpwKDwKBgQC3n9ySWNxmMUjP3OOpaZfAH3xsERhsbvDZ9Q9D98GHx97OM8m1\nsdMFLE7YQ2y3ifYoVDtsIzr8HGLZJd/jk/Y2wc5M1PuADE2eWuC1oYy7WdEwCP3o\n3A1CzwYJhanUavh+fzpt/eW4SChgRiYuN6h+T4jsVcC725YHomnhWEVr7wKBgQCT\n4v7vb6PyHNdsSAEUPZBKt+xBUYG3J3MNYfs7dXj99gNzfGEl6BfE/O/PpS9q5opQ\nE6z0ymTZxMhhf/XnhNFHUSEw4y7Ttcxc1qRPwqPS4GgP5WZcYOGg/l6OdUGgyY+k\nq05z5fh15iQSRZw0khkvsUvGETy2uC6pS6T/GXivBQKBgD3vpPYn20zhA40Nf5Ii\n8U4Fz6OMLueh9jBWpKk6IAKApgZ5FP2o+rpewGQmJyk00o7jh46Zag+JqIXWs/po\ntdyUPaPstsRBpRmMrimmScYR6C4qddEXwvlvI6/UBRWInBmpo1FWV+7EjpRWvMJb\n3ktY9CgLXMsLiPRV+rYe2oVD\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-9lzcg@allskii-ecd4d.iam.gserviceaccount.com",
    "client_id": "113640320638241873131",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-9lzcg%40allskii-ecd4d.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
  
  import admin from 'firebase-admin'
  
  admin.initializeApp({
      credential: admin.credential.cert(serviceAccount) 
  });
  
  const db = admin.firestore();

  export {
    db
  }