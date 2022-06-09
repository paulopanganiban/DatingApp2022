import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { MembersService } from '../services/members.service';
import { Member } from '../types/member';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member = {} as Member;
  galleryOptions: NgxGalleryOptions[] = [{
    width: '500px',
    height: '500px',
    imagePercent: 100,
    thumbnailsColumns: 4,
    imageAnimation: NgxGalleryAnimation.Slide,
    preview: false
  }];
  galleryImages: NgxGalleryImage[] = [];
  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [] as NgxGalleryImage[];
    this.member.photos?.forEach(photo => {
      console.log(photo);
      imageUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url,
      })
    }
    );
    return imageUrls;
  }
  loadMember() {
    this.memberService.getMember(this.route.snapshot.paramMap.get('username') || '')
      .subscribe(member => {
        this.member = member;
        this.galleryImages = this.getImages();
      });
  }
}
